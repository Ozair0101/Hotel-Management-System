<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function Pest\Laravel\get;

class bookingReportController extends Controller
{
    public function create() {
        $halls = Hall::all();
        return Inertia::render('BookingReport/BookingReport', ['halls' => $halls]);
    }

    public function index(Request $request) {
        // 1- Validation
        $validated = $request->validate([
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start', 
            'hall.value' => 'exists:halls,id',
        ]);

        $query = Reservation::with(['hall', 'reservationPayment', 'menuServices'])
        ->whereBetween('date', [$validated['start'], $validated['end']])->get();
        
        $selectedHall = null ;
        if(!empty($validated['hall'])){
            $query->where('hall_id', $validated['hall']['value']);
            $selectedHall = Hall::findOrFail($validated['hall']['value'])->name; 
        }
       
        $reservation = $query->map(function ($item) {
            return [
                'id' => $item->id,
                'hall_id' => $item->hall_id, 
                'firstName' => $item->firstName,
                'lastName' => $item->lastName,
                'menu_no' => $item->menuServices->menu, 
                'type' => $item->type,
                'typeDays' => $item->typeDays,
                'menu_price' => $item->menu_price,
                'personQuantity' => $item->personQuantity,
                'hall_name' => $item->hall->name, 
                'due' =>$item->reservationPayment->due,
                'date' => $item->date
            ];
        });
        // dd($reservation);
        return Inertia::render('BookingReport/Report', 
        ['reservation' => $reservation, 
        'start' => $validated['start'], 'end' => $validated['end'], 'hall_name'=>$selectedHall] 
    );
    }

    public function report() {
        $query = Reservation::with(['hall', 'reservationPayment', 'menuServices'])->get();
        $reservation = $query->map(function ($item){
            return [
                'id' => $item->id,
                'firstName' => $item->firstName,
                'lastName' => $item->lastName,
                'type' => $item->type,
                'typeDays' => $item->typeDays,
                'date' => $item->date,
                'menu_price' => $item->menu_price,
                'menu_no' => $item->menuServices->menu, 
                'personQuantity' => $item->personQuantity,
                'hall_name' => $item->hall->name, 
                'due' =>$item->reservationPayment->due,
                'amount_paid' => $item->reservationPayment->amount_paid
            ];
        });
       
        return Inertia::render('BookingReport/BookingCollection', ['reservation'=>$reservation]);
    }
}

