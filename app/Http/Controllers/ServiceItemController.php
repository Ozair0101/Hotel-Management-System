<?php

namespace App\Http\Controllers;

use App\Models\ServiceItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceItemController extends Controller
{
    public function create() {
        return Inertia::render('AddServices/AddServices');
    }

    public function store(Request $request)  {

        $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|numeric|max:255',
            'description' => '',
        ]);

        ServiceItem::create([
            'name' => $request->name, 
            'quantity' => $request->quantity,
            'description' => $request->description,
        ]);
       return redirect()->back()->with('success', 'Successfully Added!');
    }
}
