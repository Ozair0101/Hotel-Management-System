<?php

namespace App\Http\Controllers;

use App\Models\TypeExpence;
use Illuminate\Http\Request;

class TypeExpenceController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'type' => 'required|string|max:255'
        ]);
        $type = TypeExpence::create([
            'name' => $request->type
        ]);
        return redirect(route('expense.create'));    
    }
}
