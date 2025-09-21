<?php

namespace App\Http\Controllers;

use App\Models\PurchaseItem;
use App\Models\ReturnProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseItemReportController extends Controller
{
    public function report() {
        
        $report = ReturnProduct::with(['product', 'purchase'])->get();

        $report = $report->map(function ($item){
            return [
            'company' => $item->purchase->supplier->name,
            'product' => $item->product->product_name,
            'quantity' => $item->quantity_returned, 
            'date' => $item->return_date, 
            'remark' => $item->return_reason
            ];
    });
    // dd($report);
        return Inertia::render('SaleReport/PurchaseItemsReport', ['report'=> $report]);
    }
}
