<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\Stock;
use App\Models\Supplier;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class ProductController extends Controller
{
    public function index() {
       
         return inertia('Products/Index');
        
    }

    public function create(){
        $products = Product::all();
        $supplier = Supplier::all();
        return Inertia::render('Products/ProductForm', 
        ['suppliers'=>$supplier, 'products'=>$products]);
    }
    
    public function store(Request $request){
        // dd($request->all());
        $products = array_values($request->input('products', []));
        if(sizeof($products) == 0){
            abort(403, "No Product added");
        }    
        $errors = [];
        $finalCash = $request->totalPrice - $request->cashDiscount;
        
        foreach(array_values($products) as $index => $product){
            $validator = Validator::make($product, [
                'bill_number' => 'required|unique:'.Purchase::class,
                'product' => 'required',
                'quantity' => 'required|numeric',
                'unitPrice' => 'required|numeric',
                'sellPrice' => 'required|numeric',
                'discount' => 'numeric',
                'company' => 'required',
                'batch' => 'required|unique:'.PurchaseItem::class,
                'expireDate' => '',
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
        $companyId = $products[0]['companyId'];
        $bill_number = $products[0]['bill_number'];
        $now = Carbon::now();
        $purchase = Purchase::create([
            'supplier_id' => $companyId,   
            'purchase_date' => $now,
            'payment_type' => 'loan',
            'bill_number' =>$bill_number,
            'total_amount'=> $request->totalPrice,
            'discount_cash'=> $request->cashDiscount,
            'final_amount' => $finalCash,
        ]);
        
        
        foreach ($products as $index => $productData) {
            $purchaseItem = PurchaseItem::create([
                'product_id' => $productData['product_id'],   
                'purchase_id' => $purchase->id,   
                'batch' => $productData['batch'],
                'quantity' => $productData['quantity'],
                'unit_price'=> $productData['unitPrice'],
                'discount_per_unit'=> $productData['discount'],
                'total_price' => $productData['totalPrice'],
            ]);  
            Stock::create([
                'product_id' => $productData['product_id'],   
                'purchase_id' => $purchase->id,   
                'batch' => $productData['batch'],
                'unit_price' => $productData['unitPrice'],
                'quantity' => $productData['quantity'],
                'expire_date' => $productData['expireDate'],
            ]);
        }
        Payment::create([
            'purchase_id' => $purchase->id,
            'payment_date' => $now,
            // 'payment_type'=> 'laon',
            'amount_paid' => 0 ,
            'remaining_amount' => $finalCash,
        ]);
        return redirect()->back()->with('success', 'Company Successfully Added!');        
    }

    public function report() {
        $purchases = Purchase::with(['supplier', 'purchaseItems.product'])->orderBy('purchase_date', 'desc')->get();
        
        $report = $purchases->map(function ($purchase){
            return [
                'id' => $purchase->id, 
                'bill_number' => $purchase->bill_number, 
                'supplier' => $purchase->supplier->name, 
                'city' => $purchase->supplier->city, 
                'phone' => $purchase->supplier->phone, 
                'total_amount' => $purchase->total_amount, 
                'final_amount' => $purchase->final_amount, 
                'purchase_date' => $purchase->purchase_date,
                'payment'=> $purchase->payment ? [
                    'payment_date' => $purchase->payment->payment_date,
                    'payment_type' => $purchase->payment->payment_type,
                    'remaining_amount' => $purchase->payment->remaining_amount,
                    'paid_amount' => $purchase->payment->amount_paid,
                ] : null ,
            ];
        });

        return Inertia::render("Products/PurchaseReport", ['report' => $report]);
    }
}