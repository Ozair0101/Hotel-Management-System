<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function create() {
        return Inertia::render('Employee/Employee');
    }
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'position' => 'required',
            'phone' => 'required',
            'address' => '',
        ]);

        $employee = Employee::create([
            'name' => $request->name,
            'lastName' => $request->lastName,
            'position' => $request->position,
            'phone' => $request->phone,
            'address' => $request->address
        ]);
        return redirect()->back()->with(['success', 'successfully']);
    }
}
