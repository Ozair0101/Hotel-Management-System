<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Purchase;
use App\Models\ReturnSale;
use App\Models\ReturnSaleItem;
use App\Models\Sale;
use App\Models\SaleItems;
use App\Models\Stock;
use Faker\Provider\ar_EG\Internet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use PhpParser\Node\Stmt\Catch_;

class ReturnSaleController extends Controller
{
    public function create() {
        
        $customers = Cache::remember("customer.all", 60, function() {
            return  Customer::all();
        }); 

        $items = SaleItems::with(['sale.customer','product', 'sale.payment'])->get();

        $sales = $items->map(function ($item){
            return [
               'item_id' => $item->id, 
               'sale_id' => $item->sale->id,
               'product_id' => $item->product->id,
               'productName' => $item->product->product_name,
               'quantity' => $item->quantity, 
               'unit_price' => $item->unit_price,
               'sale_price' => $item->sale_price,  
               'batch' => $item->batch,
               'discount' => $item->discount_per_unit,
               'payment_id' => $item->sale->payment->id
            ];
        });
        // dd($sales);

        return Inertia::render('SaleProducts/ReturnSale', 
            ['customers' => $customers,  'sales' => $sales]);
        }

        ////////////////////////////////////////////////////////////
        
        public function update(Request $request) {

        $products = array_values($request->input('products', []));
        $errors = [];
        if(sizeof($products) == 0){
            abort(403, "Products empty");
        }
        // dd($products);
        foreach(array_values($products) as $index => $product){
            $validator = Validator::make($product, [
                'productName' => 'required',
                'quantity' => 'required|numeric',
                'unitPrice' => 'required|numeric',
                'sellPrice' => 'required|numeric',
                'discount' => 'numeric',
                'batch' => 'required|exists:stocks,batch',
                'customerName' => 'required',
                'totalPrice' => 'numeric'
            ]);
            if($validator->fails()){
                $errors[$index] = $validator->errors()->messages();
            }
        }
        $flattenedErrors = array_reduce(array_keys($errors), function ($carry, $index) use ($errors) {
            foreach ($errors[$index] as $field => $message) {
                $carry["products.$index.$field"] = reset($message);
            }
            return $carry; 
        }, []);
        
        if(!empty($flattenedErrors)){
            return redirect()->back()->withErrors($flattenedErrors)->withInput();
        }
        $saleId = array_unique(array_column($products, 'sale_id'));
        if(!(count($saleId) === 1)){
            abort(403, "Products No match");
        }
        
        // dd($request->all());
        $price = $request->totalPrice - $request->cashDiscount;
        $sales = Sale::findOrFail($saleId[0]);
        // dd($price);
        $finalPrice = $sales->final_amount - $price;
        $totalPrice = $sales->total_amount - $price;

        $saleReturn = ReturnSale::create([
            'sale_id' => $saleId[0],
            'reason' => '',
            'total_refund_amount' => $price,
            'return_date' => now()
        ]);
        foreach ($products as $index => $productData) {
            $stock = Stock::where('batch', $productData['batch'])->first();
            $newQuantity = $stock->quantity + $productData['quantity'];
            $saleItems = SaleItems::find($productData['item_id']);
            $saleItems->update(['quantity' => $saleItems->quantity - $productData['quantity']]);
            $stock->update(['quantity' => $newQuantity]);
            $saleReturnItems = ReturnSaleItem::create([
                'product_id' => $productData['product_id'],
                'return_sale_id' => $saleReturn->id,
                'quantity_returned' => $productData['quantity'],
                'refund_amount' => $productData['totalPrice'] 
            ]);
        }
        $sales->update([
            'final_amount' => $finalPrice, 
            'total_amount' => $totalPrice
        ]);

        if($sales->payment_type === 'cash'){
            $sales->payment->update([
                'amount_paid' => $finalPrice
            ]);
        }else if ($sales->payment_type === 'partially'){
            $remaining_amount = $sales->payment->remaining_amount;
            if($remaining_amount >= $price) {
                $sales->payment->update([
                    'remaining_amount' => $remaining_amount - $price
                ]);
            }else{
                $remaining = $price - $remaining_amount;
                $amount_paid = $sales->payment->amount_paid - $remaining;
                $sales->payment->update([
                    'remaining_amount' => 0 ,
                    'amount_paid' => $amount_paid,
                ]);
            }
        }else {
            $sales->payment->update([
                'remaining_amount' => $finalPrice
            ]);
        }
                
       return redirect()->back()->with('success', 'Product succefully returned!');
    }

    public function index() {
        $saleReturnItems = ReturnSaleItem::with(['product', 'returnSale.sale.customer'])->get();
        $report = $saleReturnItems->map(function($item) {
            return [
                'product' => $item->product->product_name, 
                'date' => $item->returnSale->return_date,
                'customer' => $item->returnSale->sale->customer->first_name,
                'quantity' => $item->quantity_returned,
                'refund_amount' => $item->refund_amount
            ];
        });
        // dd($report);
        return Inertia::render('SaleReport/ReturnSaleItemsReport', [
            'report' => $report
        ]);
    }
}
