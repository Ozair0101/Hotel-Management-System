<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\SendKitchen;
use App\Models\SendKitchenItem;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SendKitchenController extends Controller
{
    public function create() {
        $customers = Reservation::select('firstName', 'id', 'lastName')->get();
        
        $products = Stock::with(['purchase.purchaseItems','product'])
                            ->where('quantity', '>', 0)->get();

        $stock = $products->map(function ($product){
            return [
               'stock_id' => $product->id, 
               'product_id' => $product->product_id,
               'name' => $product->product->product_name,
               'quantity' => $product->quantity, 
               'unit_price' => $product->unit_price, 
               'expire_date' => $product->expire_date, 
               'batch' => $product->batch,
            ];
        });
        return Inertia::render('SendKitchen/SendKitchen', 
            ['customers' => $customers,  'products' => $stock]); 
    }

    public function store(Request $request) {
        $products = array_values($request->input('products', []));
        // dd($products);
        $errors = [];
        if(sizeof($products) == 0){
            abort(403, "No Product added");
        }   
    
        $finalCash = $request->totalPrice - $request->cashDiscount;
        $customer_id = $products[0]['customer_id'];
        
        foreach(array_values($products) as $index => $product){
            $validator = Validator::make($product, [
                'product' => 'required',
                'quantity' => 'required|numeric',
                'unitPrice' => 'required|numeric',
                'discount' => 'numeric',
                'customer' => 'required',
                'batch' => 'required|exists:stocks,batch',
                'totalPrice' => 'numeric',
                'date' => 'required'
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

        $sale = SendKitchen::create([
            'reservation_id' => $customer_id,   
            'date' => $products[0]['date'],
            'total_amount'=> $request->totalPrice,
            'total_discount'=> $request->cashDiscount ?? 0,
        ]);

        foreach ($products as $index => $productData) {

            $saleItem = SendKitchenItem::create([
                'product_id' => $productData['product_id'],
                'send_kitchen_id' => $sale->id,
                'batch' => $productData['batch'],
                'quantity' => $productData['quantity'],
                'unit_price'=> $productData['unitPrice'],
                'discount_per_unit'=> $productData['discount'],
            ]);
            $stock = Stock::where('id', $productData['stock_id'])
                            ->where('batch', $productData['batch'] ?? null)->first();
            if($stock->quantity > 0 ){  
                $stock->decrement('quantity', $productData['quantity']);
            }                
        }
        return redirect()->back()->with('success', 'successfully sale it.');
    }
}
