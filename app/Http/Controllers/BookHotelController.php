<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\MenuService;
use App\Models\Reservation;
use App\Models\ReservationPayment;
use App\Models\ServiceItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BookHotelController extends Controller
{
    public function create() {
        $menus = MenuService::with('serviceItems')->get();
        $halls = Hall::all(); 
        $itemServices = ServiceItem::all();
        $menus = $menus->map(function ($menu){
            return [
                'id' => $menu->id,
                'price' => $menu->price,
                'menu' =>$menu->menu,
                'service_items' => $menu->serviceItems->map(function ($item) {
                    return [
                        'id' => $item->id, 
                        'name' => $item->name,
                        'quantity' => $item->quantity
                    ];
                })
            ];
        });
        return Inertia::render('Booking/BookHotel', [
            'menus' => $menus, 
            'halls' => $halls,
            'itemServices' => $itemServices 
        ]);
    }
    public function store(Request $request) {
       $validator = $request->validate([
            'firstName' => "required|max:255|string",
            'fatherName' => "required|max:255|string",
            'lastName' => "required|max:255|string",
            'personQuantity' => "required|min:1",
            'type' => "required|max:255|string",
            'phone' => "required|max:255|string",
            'menu_id' => "required|exists:menu_services,id",
            'hall_id' => "required|exists:halls,id",
            'typeDays' => ['required', Rule::in(['Day', 'Night'])] ,
            'date' => "required",
            'menu_price' => "required",
            'menu_services' => "required|array"
        ]);
        try {
            $reservation = Reservation::create([
                'firstName' => $validator['firstName'],
                'fatherName' =>  $validator['fatherName'],
                'lastName' =>  $validator['lastName'] ,
                'personQuantity' =>  $validator['personQuantity'],
                'phone' => $validator['phone'] ,
                'type' =>  $validator['type'],
                'hall_id' =>  $validator['hall_id'],
                'menu_services_id' =>  $validator['menu_id'],
                'typeDays' =>  $validator['typeDays'],
                'date' =>  $validator['date'],
                'menu_price'=>  $validator['menu_price'],
                'menu_services' =>  $validator['menu_services']
            ]);
            
            $due = $reservation['menu_price'] * $reservation['personQuantity']; 

            ReservationPayment::create([
                'reservation_id' => $reservation['id'],
                'payment_date' => now(),
                'due' => $due,
                'amount_paid' => 0 ,
            ]);
            return redirect()->back()->with('success', 'successfully added!');
        
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            // dd('error');
            return redirect()->back()->withErrors('error', 'Check Your Information Again!');
        }
    }
}
