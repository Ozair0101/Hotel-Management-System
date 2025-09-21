<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Inertia\Inertia;

class Expence extends Model
{
    protected $fillable = [
        'type_expences_id', 
        'employee_id',
        'vendor_id',
        'amount',
        'payment_method',
        'date', 
        'remark'
    ];
   public function employee() {
        return $this->belongsTo(Employee::class);
   }

   public function vendor()  {
          return $this->belongsTo(Vendor::class);
   }

   public function typeExpence() {
        return $this->belongsTo(TypeExpence::class, 'type_expences_id');
   }
}
