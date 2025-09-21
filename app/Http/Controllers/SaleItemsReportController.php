<?php

namespace App\Http\Controllers;

use App\Models\SaleItems;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleItemsReportController extends Controller
{
    public function report() {
        $saleItems = SaleItems::with(['sale.customer', 'product'])->where('quantity', '>', 0)->get();
        $report = $saleItems->map(function ($item){
            return [
            'customer' => $item->sale->customer->first_name,
            'product' => $item->product->product_name,
            'quantity' => $item->quantity, 
            'sale_price' => $item->sale_price, 
            'discount' => $item->discount_per_unit, 
            'date' => $item->sale->sale_date,
            ];
    });
   
        return Inertia::render('SaleReport/SaleItemsReport', ['report'=> $report]);
    }
}
