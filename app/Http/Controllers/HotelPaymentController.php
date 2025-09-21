<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\ReservationPayment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class HotelPaymentController extends Controller
{
    public function create(Request $request) {
        $reservation = Reservation::findOrfail($request->id);
        $total_price = $reservation->personQuantity * $reservation->menu_price;
        $payment = [
            'id' => $reservation->id, 
            'payment_id' => $reservation->reservationPayment->id,
            'firstName' => $reservation->firstName,
            'lastName' => $reservation->lastName,
            'total_price' => $total_price,
            'due' => $reservation->reservationPayment->due,
            'amount_paid' =>$reservation->reservationPayment->amount_paid,
        ];
        return Inertia::render('BookingReport/Payment', ['payment' => $payment]);
    }

    public function store(Request $request) {
        
        $total_amount = $request->total_amount;
        $response = $request->validate([
            'payment_type' => ['required',  Rule::in(['cash', 'bank'])],
            'credit' => "required|min:0|numeric||max:$total_amount",
        ]);

        $now = Carbon::now();
        $id = $request->payment_id;
        $payment = ReservationPayment::findOrFail($id);
        $pastAmount = $payment->amount_paid;
        $updatedAmount = $pastAmount + $response['credit'];
        
        $payment->update([
            'payment_date' => $now,
            'amount_paid' => $updatedAmount,
            'due' => $total_amount - $updatedAmount,
            'payment_type' => $response['payment_type']
        ]);
        return redirect()->back()->with('success', 'successfully!');    
    }
    
}
