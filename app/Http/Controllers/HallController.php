<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HallController extends Controller
{
    public function create() {
        return Inertia::render('Hall/HallForm');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'capacity' => 'required|min:1|numeric',
            'type' => 'required'
        ]);

        $type = $request->type;

        $hall = Hall::create([
            'name' => $request->name,
            'capacity' => $request->capacity,
            'type' => $type['label']
        ]);

        // dd($request->all());
        return Inertia::render('Hall/HallForm');
    }
}
