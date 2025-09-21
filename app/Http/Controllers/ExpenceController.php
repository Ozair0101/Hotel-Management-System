<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Expence;
use App\Models\TypeExpence;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use phpDocumentor\Reflection\PseudoTypes\LowercaseString;

class ExpenceController extends Controller
{
    public function create()  {
        $employee = Employee::all(); 
        $vendor = Vendor::all(); 
        $typeExpences = TypeExpence::all(['id', 'name']); 

        return Inertia::render('Expences/Expences', ['employee' => $employee, 'vendor' => $vendor, 'typeExpences' => $typeExpences]); 
    }

    public function store(Request $request) {
        // dd($request->all());
        $request->validate([
            'type.label' => 'required|string|max:255',
            'payTo.value' => 'required',
            'amount' => 'required|numeric',
            'payment_method.label' => ['required', Rule::in(['cash', 'bank'])],
            'date' => 'required',
            'remark' => '',
        ]);
        
        if(strtolower($request->type['label']) == 'salary'){
            $employee_id = $request->payTo['value']; 
            $vendor_id = null; 
        }else{
            $employee_id = null; 
            $vendor_id = $request->payTo['value']; 
        }

        Expence::create([
            'type_expences_id' => $request->type['value'], 
            'employee_id' => $employee_id,
            'vendor_id' => $vendor_id,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method['label'],
            'date' => $request->date, 
            'remark' => $request->remark
        ]);
        return redirect()->back()->with(['success', 'successfully']); 
    }

    
    public function report() {    
        return Inertia::render('Expences/ExpensesReport');
    }

    public function index(Request $request) {
        
        $validated = $request->validate([
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start', 
        ]);

        $report = Expence::with(['vendor', 'employee', 'typeExpence'])
            ->whereBetween('date',[$request->start, $request->end])->get();

        $report = $report->map(function($item) {
            return [
                'date' => $item->date, 
                'amount' => $item->amount,
                'remark' => $item->remark,
                'name' => $item->employee->name ?? $item->vendor->name ,
                'expense_type' => $item->typeExpence->name ?? ""
            ]; 
        });
        // dd($report);
        return Inertia::render('Expences/Report', 
            ['report' => $report, 'start' => $request->start, 'end' => $request->end]); 
    }

}
