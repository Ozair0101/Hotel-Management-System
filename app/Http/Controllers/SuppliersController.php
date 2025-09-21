<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuppliersController extends Controller
{
    public function create(){
        return Inertia::render('Market/AddCompany');
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => '',
            'phone' => 'required',
            'city' => '',
            'address' => ''
        ]);
        $supplier = Supplier::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'city' => $request->city ,
            'address' => $request->address
        ]);
        return redirect()->back()->with('success', 'Company Successfully Added!');        
    }
}
