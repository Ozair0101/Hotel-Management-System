<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\ReservationPayment;
use App\Models\SalePayment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DasboardController extends Controller
{
    public function index(Request $request){
        
        $now = Carbon::today();
        $last7Days = Carbon::today()->subDays(6);
        $last30Days = Carbon::today()->subDays(30);
        $last3Month = Carbon::now()->subMonths(2)->startOfMonth();

        // Fetch all totals in one query
        $purchase = Payment::selectRaw("
            COALESCE(SUM(CASE WHEN DATE(payment_date) = ? THEN amount_paid ELSE 0 END), 0) AS dailyPurchase,
            COALESCE(SUM(CASE WHEN payment_date >= ? THEN amount_paid ELSE 0 END), 0) AS weeklyPurchase,
            COALESCE(SUM(CASE WHEN payment_date >= ? THEN amount_paid ELSE 0 END), 0) AS monthlyPurchase
        ", [$now, $last7Days, $last30Days])->first();

        $sales = SalePayment::selectRaw("
            COALESCE(SUM(CASE WHEN DATE(payment_date) = ? THEN amount_paid ELSE 0 END), 0) AS dailySales,
            COALESCE(SUM(CASE WHEN payment_date >= ? THEN amount_paid ELSE 0 END), 0) AS weeklySales,
            COALESCE(SUM(CASE WHEN payment_date >= ? THEN amount_paid ELSE 0 END), 0) AS monthlySales
        ", [$now, $last7Days, $last30Days])->first();
        
        $salesData = SalePayment::selectRaw("
            DATE_FORMAT(payment_date, '%Y-%m') as month, 
            SUM(amount_paid) as totalSales
        ")->where('payment_date', '>=', $last3Month)
          ->groupBy('month')
          ->orderBy('month', 'ASC')
          ->get();

        $reservation = ReservationPayment::selectRaw("
            COALESCE(SUM(CASE WHEN DATE(payment_date) = ? THEN amount_paid ELSE 0 END), 0) AS dailyBooking,
            COALESCE(SUM(CASE WHEN payment_date >= ? THEN amount_paid ELSE 0 END), 0) AS weeklyBooking,
            COALESCE(SUM(CASE WHEN payment_date >= ? THEN amount_paid ELSE 0 END), 0) AS monthlyBooking
        ", [$now, $last7Days, $last30Days])->first();

        $start = Carbon::now()->startOfDay();
        $end = Carbon::now()->addDays(6)->endOfDay();
        $next7Days = Reservation::with(['hall'])->whereBetween('date', [$start, $end])
        ->orderBy('date')
        ->get();
        
        $reservated = $next7Days->map(function ($item) {
            return [
                'id' => $item->id,
                'firstName' => $item->firstName,
                'lastName' => $item->lastName,
                'typeDays' => $item->typeDays,
                'hall_name' => $item->hall->name,
                'date' => $item->date,
            ];
        });
        $hall = Hall::all(['name']);
        
        $weeklyReport = SalePayment::selectRaw("
            DATE(payment_date) as date, 
            SUM(amount_paid) as sales
        ")
        ->where('payment_date', '>=', $now->subDays(7)->startOfDay())
        ->groupBy('date')
        ->orderby('date', 'ASC')
        ->get();

        return Inertia::render('Dashboard', [
            'dailyPurchase' => $purchase->dailyPurchase,
            'weeklyPurchase' => $purchase->weeklyPurchase,
            'monthlyPurchase' => $purchase->monthlyPurchase,
            'dailySales' => $sales->dailySales,
            'weeklySales' => $sales->weeklySales,
            'monthlySales' => $sales->monthlySales,
            'dailyBooking' => $reservation->dailyBooking,
            'weeklyBooking' => $reservation->weeklyBooking,
            'monthlyBooking' => $reservation->monthlyBooking,
            'reservated'=> $reservated,
            'salesData' => $salesData,
            'weeklyReport' =>$weeklyReport ,
            'halls' => $hall
        ]);
    }

}
