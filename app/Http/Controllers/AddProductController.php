<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddProductController extends Controller
{
    public function create() {
        return Inertia::render('Market/AddProduct');
    }
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'madeFrom' => 'required',
            'category' => '',
        ]);
        // dd($request->all());
        Product::create([
            'product_name' => $request->name, 
            'made_from' => $request->madeFrom,
            'category' => $request->category,
        ]);
        // dd("sfsf");
        return redirect()->back()->with(['success' => 'Product Successfully addedd!']);
    }
}
