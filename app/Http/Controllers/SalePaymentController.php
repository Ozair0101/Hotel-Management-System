<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SalePayment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SalePaymentController extends Controller
{
    public function create($id) {
        $sales = Sale::findOrFail($id);
     
        // dd($purchase->payment->remaining_amount);
        $payment = [
            'sale_id' => $sales->id,
            'payment_id' => $sales->payment->id,
            'customer' => $sales->customer->first_name,
            'total_amount' => $sales->final_amount, 
            'amount_paid' => $sales->payment->amount_paid,
            'payment_type' => $sales->payment->payment_type, 
            'remaining_amount' => $sales->payment->remaining_amount
        ];
        // dd($payment['company']); 
        return Inertia::render("SaleProducts/Payment", ['payment' => $payment]);
    }

    public function store(Request $request) {
        $total_amount = $request->total_amount; 
        $response = $request->validate([  
            'payment_id' => 'required',
            'sale_id' => 'required',
            'amount_paid' => "required|numeric|min:0|max:$total_amount",
            'payment_type' => ['required', Rule::in(['loan', 'cash', 'partially'])] 
        ]);
        $now = Carbon::now();
        
        $sales = Sale::findOrFail($response['sale_id']);
        $payment = SalePayment::findOrFail($response['payment_id']);
        $pastAmount = $payment->amount_paid;
        $updatedAmount = $pastAmount + $response['amount_paid'];
        $remaining = $payment->remaining_amount; 
        
        if($response['payment_type'] == 'cash' && $response['amount_paid'] < $remaining){
            $response['payment_type'] = 'partially';
        }
        if($response['payment_type'] == 'partially' && $response['amount_paid'] == $remaining){
            $response['payment_type'] = 'cash';
        }

        $sales->update([ 'payment_type'=> $response['payment_type'] ]);
        $payment->update([
            'payment_date' => $now,
            'amount_paid' => $updatedAmount,
            'remaining_amount' => $total_amount - $updatedAmount,
        ]);
       return redirect()->route('saleProduct.report');
    }
}
