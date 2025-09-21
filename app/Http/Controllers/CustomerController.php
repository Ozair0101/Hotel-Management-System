<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    
    public function create() {
        return Inertia::render('SaleProducts/CustomerForm');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required',
            'address' => ''
        ]);
        $supplier = Customer::create([
            'first_name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address
        ]);
        return redirect()->back()->with('success', 'Company Successfully Added!');   
       
    }
}
