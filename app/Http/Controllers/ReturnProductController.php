<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\ReturnProduct;
use App\Models\Stock;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class ReturnProductController extends Controller
{
    public function create(){
        $suppliers = Supplier::all();

        $products = Stock::with(['purchase.purchaseItems','product'])
                                ->where('quantity', '>', 0)->get();
        
        $stock = $products->map(function ($product){
            return [
               'stock_id' => $product->id, 
               'product_id' => $product->product_id,
               'name' => $product->product->product_name,
               'purchase_id' => $product->purchase_id, 
               'quantity' => $product->quantity, 
               'unit_price' => $product->unit_price, 
               'expire_date' => $product->expire_date, 
               'batch' => $product->batch,
               'bill_number' => $product->purchase->bill_number,
               'payment_type' => $product->purchase->payment_type,
               'purchaseItems' => $product->purchase->purchaseItems->map(function ($items){
                    return [
                        'discount_per_unit' => $items->discount_per_unit,
                        'product_id' => $items->product_id
                    ];
               })
            ];
        });
        
        return Inertia::render('Products/ReturnProduct', 
            ['suppliers' => $suppliers,  'products' => $stock]);
    }

    public function update(Request $request) {
        // dd($request->all());
        $stock = Stock::findOrFail($request->stock_id); 
        $request->validate([
            "product" => "required",
            "company" => "required",
            "quantity" => "required|min:1",
            "unitPrice" => "required",
            "sellPrice" => "required",
            "batch" => "required|exists:stocks,batch"
        ]);
        $exist_id = $stock->purchase->supplier->id; 
        if($exist_id != $request->companyId){
            return redirect()->back()->withErrors("Company do not much!"); 
        }     
        
        $newQuantity = $stock->quantity - $request->quantity;
        $price = $request->totalPrice;
        
        $purchase = Purchase::findOrFail($request->purchase_id);
        $finalPrice = $purchase->final_amount - $price;
        $totalPrice = $purchase->total_amount - $price;
        
        $purchaseItems = PurchaseItem::where('batch', $request->batch)->first();
        $itemQuantity = $purchaseItems->quantity - $request->quantity; 
        // dd($itemQuantity);
        $stock->update([
            'quantity' => $newQuantity 
        ]);
        $purchase->update([
            'final_amount' => $finalPrice, 
            'total_amount' => $totalPrice
        ]); 
        $purchaseItems->update(['quantity'=>$itemQuantity]);
        
        if($purchase->payment_type === 'cash'){
            $purchase->payment->update([
                'amount_paid' => $finalPrice
            ]);
        }else if ($purchase->payment_type === 'partially'){
            $due = $purchase->payment->remaining_amount;
            if($due >= $price) {
                $purchase->payment->update([
                    'remaining_amount' => $due - $price
                ]);
            }else{
                $remaining = $price - $due;
                $amount_paid = $purchase->payment->amount_paid - $remaining;
                $purchase->payment->update([
                    'remaining_amount' => 0 ,
                    'amount_paid' => $amount_paid,
                ]);
            }
        }else {
            $purchase->payment->update([
                'remaining_amount' => $finalPrice
            ]);
        }
        ReturnProduct::create([
            'purchase_id' => $purchase->id, 
            'product_id' => $stock->product_id, 
            'quantity_returned' => $request->quantity,
            'return_date' => now(), 
            'return_reason' => $request->remark
        ]);
        return redirect()->route('stock.index');
    }
}
