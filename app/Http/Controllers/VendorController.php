<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function create() {
        return Inertia::render('Vendor/Vendor');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required',
            'address' => '',
        ]);

        $vendor = Vendor::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address
        ]);

        return redirect()->back()->with(['success', 'successfully']);
    }
}
