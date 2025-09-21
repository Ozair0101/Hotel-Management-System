<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\ReservationPayment;
use App\Models\SalePayment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DueController extends Controller
{
    public function sale() {

        $sales = SalePayment::with(['sale.saleItems'])->where('remaining_amount', '>', 0)->get();
         
        $report = $sales->map(function ($sale){
            return [
                'id'=> $sale->sale->id,
                'check_number' => $sale->sale->invoice_number, 
                'name' => $sale->sale->customer->first_name, 
                'final_amount' => $sale->sale->final_amount,
                'payment_type' => $sale->sale->payment_type,
                'payment_date' => $sale->payment_date,
                'due' => $sale->remaining_amount,
                'amount_paid' => $sale->amount_paid,
            ];
        });
        return Inertia::render('Due/Due', ['report'=>$report, 'paymentLink' => 'salePayment.create', 'name' => 'Sale']);
    }

    public function purchase() {
        $purchases = Payment::with('purchase.purchaseItems')->where('remaining_amount', '>', 0)->get();
        $report = $purchases->map(function ($sale){
            return [
                'id'=> $sale->purchase->id,
                'check_number' => $sale->purchase->bill_number, 
                'name' => $sale->purchase->supplier->name, 
                'final_amount' => $sale->purchase->final_amount,
                'payment_type' => $sale->purchase->payment_type ,
                'payment_date' => $sale->payment_date,
                'due' => $sale->remaining_amount,
                'amount_paid' => $sale->amount_paid,
            ];
        });
        return Inertia::render('Due/Due', ['report'=>$report, 'paymentLink' => 'payment.create', 'name' => "Purchase"]);
    }

    public function booking() {
        $reservation = ReservationPayment::where('due', '>', 0)->get();
        $report = $reservation->map(function ($sale){
            return [
                'id'=> $sale->reservation->id,
                'check_number' => $sale->reservation->id, 
                'name' => $sale->reservation->firstName, 
                'final_amount' => ($sale->reservation->personQuantity * $sale->reservation->menu_price),
                'payment_type' => $sale->payment_type ,
                'payment_date' => $sale->payment_date,
                'due' => $sale->due,
                'amount_paid' => $sale->amount_paid,
            ];
        });
        return Inertia::render('Due/BookingDue', ['report'=>$report, "name"=> "Booking"]);
    }
}
