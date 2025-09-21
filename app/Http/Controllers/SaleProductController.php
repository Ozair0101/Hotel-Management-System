<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\PurchaseItem;
use App\Models\Sale;
use App\Models\SaleItems;
use App\Models\SalePayment;
use App\Models\Stock;
use App\Models\Supplier;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SaleProductController extends Controller
{
    public function create() {
        $customers = Customer::all();

        $products = Stock::with(['purchase.purchaseItems','product'])
                            ->where('quantity', '>', 0)->get();
        // dd($customers);
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
        return Inertia::render('SaleProducts/SaleForm', 
            ['customers' => $customers,  'products' => $stock]); 
    }


    public function show(Request $request) {
        
        $products = array_values($request->input('products', []));
        $errors = [];
        if(sizeof($products) == 0){
            abort(403, "No Product added");
        }   
        $finalCash = $request->totalPrice - $request->cashDiscount;
        $customer_id = $products[0]['customer_id'];
        
        // dd($products[1]['product_id']);
        // dd($finalCash);
        foreach(array_values($products) as $index => $product){
            $validator = Validator::make($product, [
                'product' => 'required',
                'quantity' => 'required|numeric',
                'unitPrice' => 'required|numeric',
                'sellPrice' => 'required|numeric',
                'discount' => 'numeric',
                'customer' => 'required|max:225|string',
                'batch' => 'required|exists:stocks,batch',
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
            // dd($flattenedErrors);
            return redirect()->back()->withErrors($flattenedErrors)->withInput();
        }

        $now = Carbon::now();

        $sale = Sale::create([
            'customer_id' => $customer_id,   
            'sale_date' => $now,
            'payment_type' => 'loan',
            'total_amount'=> $request->totalPrice,
            'total_discount'=> $request->cashDiscount ?? 0,
            'final_amount' => $finalCash,
        ]);

        foreach ($products as $index => $productData) {

            $saleItem = SaleItems::create([
                'product_id' => $productData['product_id'],
                'sale_id' => $sale->id,
                'batch' => $productData['batch'],
                'quantity' => $productData['quantity'],
                'unit_price'=> $productData['unitPrice'],
                'sale_price' => $productData['sellPrice'],
                'discount_per_unit'=> $productData['discount'],
                'total_price' => $productData['totalPrice'],
            ]);
            $stock = Stock::where('id', $productData['stock_id'])
                            ->where('batch', $productData['batch'] ?? null)->first();
            if($stock->quantity > 0 ){
                $stock->decrement('quantity', $productData['quantity']);
            }                
        }

        SalePayment::create([
            'sale_id' => $sale->id,
            'payment_date' => $now ,
            'amount_paid' => 0,
            'remaining_amount' => $finalCash,
        ]);
        
        return redirect()->back()->with('success', 'successfully sale it.');
    }
    
    public function report() {
        $sales = Sale::with(['customer', 'saleItems.product', 'payment'])->latest()->get();
        
        $report = $sales->map(function ($sale){
            return [
                'id'=> $sale->id,
                'invoice_number' => $sale->invoice_number, 
                'customer' => $sale-> customer->first_name,
                'sale_date' => $sale->sale_date, 
                'total_amount' => $sale->total_amount, 
                'final_amount' => $sale->final_amount,
                'payment_type' => $sale->payment_type,
                $sale->saleItems->map(function($item) {
                    return [
                        'product_name' => $item->product->name,
                        'quantity' => $item->quantity,
                        'salePrice' => $item->sale_price, 
                        'totalPrice' => $item->total_price,
                    ];
                }), 
                'payment'=> $sale->payment ? [
                    'payment_date' => $sale->payment->payment_date,
                    'remaining_amount' => $sale->payment->remaining_amount,
                    'amount_paid' => $sale->payment->amount_paid,
                ] : null ,
            ];
        });
        // dd($report);
        return Inertia::render('SaleProducts/SaleReport', ['report' => $report]);
    }
}
