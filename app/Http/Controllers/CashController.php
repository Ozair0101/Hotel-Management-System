<?php

namespace App\Http\Controllers;

use App\Models\Expence;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\ReservationPayment;
use App\Models\SalePayment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashController extends Controller
{
    public function report() {
        return Inertia::render('Cash/CashDate'); 
    }

    public function index(Request $request)  {
 
        $validated = $request->validate([
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start', 
        ]);

        $dateRange = [$request->start, $request->end];

        $booking = ReservationPayment::select('payment_date', 'amount_paid')->whereBetween('payment_date', $dateRange)->where('amount_paid', '>', 0)->get();
        
        $sale = SalePayment::select('payment_date', 'amount_paid')->whereBetween('payment_date', $dateRange)->where('amount_paid', '>', 0)->get();
        
        $purchase = Payment::select('payment_date', 'amount_paid')->whereBetween('payment_date', $dateRange)->where('amount_paid', '>', 0)->get();
        
        $expense = Expence::with(['typeExpence'])
            ->whereBetween('date',$dateRange)->get();

        $expense = $expense->map(function($item) {
                return [
                    'date' => $item->date, 
                    'amount' => $item->amount,
                    'remark' => $item->remark,
                    'expense_type' => $item->typeExpence->name ?? ""
                ]; 
            });

        return Inertia::render('Cash/CashReport', ['booking' => $booking, 'sale'=>$sale, 'expense'=>$expense, 'start'=>$request->start, 'end'=>$request->end, 'purchase'=>$purchase]);
    }
}
