<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Purchase;
use Carbon\Carbon ;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Laravel\Pail\ValueObjects\Origin\Console;

class PaymentController extends Controller
{
    public function create($id) {
        
        $purchase = Purchase::findOrFail($id);
     
        // dd($purchase->payment->remaining_amount);
        $payment = [
            'purchase_id' => $purchase->id,
            'payment_id' => $purchase->payment->id,
            'bill_number' => $purchase->bill_number,
            'company' => $purchase->supplier->name,
            'total_amount' => $purchase->final_amount,
            'remaining_amount' => $purchase->payment->remaining_amount, 
            'amount_paid' => $purchase->payment->amount_paid,
            'payment_type' => $purchase->payment->payment_type, 
        ];
        // dd($payment); 
        return Inertia::render("Products/Payment", ['payment' => $payment]);
    }

    public function store(Request $request) {
        $total_amount = $request->total_amount;
        $response = $request->validate([  
            'payment_id' => 'required',
            'purchase_id' => 'required',
            'amount_paid' => "required|numeric|min:0|max:$total_amount",
            'payment_type' => ['required', Rule::in(['loan', 'cash', 'partially'])] 
        ]);

        $now = Carbon::now();
        
        $purchase = Purchase::findOrFail($response['purchase_id']);
        $payment = Payment::findOrFail($response['payment_id']);
        $pastAmount = $payment->amount_paid;
        $updatedAmount = $pastAmount + $response['amount_paid'];
        $remaining = $payment->remaining_amount; 

        if($response['payment_type'] == 'cash' && $response['amount_paid'] < $remaining){
            $response['payment_type'] = 'partially';
        }
        if($response['payment_type'] == 'partially' && $response['amount_paid'] == $remaining){
            $response['payment_type'] = 'cash';
        }
       
        $purchase->update([ 'payment_type'=> $response['payment_type'] ]);
        $payment->update([
            'payment_date' => $now,
            'amount_paid' => $updatedAmount,
            'remaining_amount' => $total_amount - $updatedAmount,
            'payment_type' => $response['payment_type']
        ]);
        return redirect()->route('products.report');
    }
    public function show() {
        return "hello";
    }
}       