<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index() {
        $stock = Stock::with(['product', 'purchase.purchaseItems'])->where('quantity', '>', 0)->get();
            
        return Inertia::render('Products/Stock', ['stock' => $stock]);
    }
    
    public function show() {
        $stock = Stock::with('product')->where('quantity', '=', 0)->get();
        return Inertia::render('Products/StockZero', ['stock' => $stock]);
    }
    
}
