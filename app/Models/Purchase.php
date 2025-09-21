<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;
       protected $fillable = [
        'supplier_id',
        'purchase_date',
        'payment_type',
        'bill_number',
        'total_amount',
        'discount_cash',
        'final_amount',
    ];
       public function supplier()
       {
           return $this->belongsTo(Supplier::class);
       }

       public function purchaseItems()
       {
           return $this->hasMany(PurchaseItem::class);
       }

       public function payment() {
            return $this->hasOne(Payment::class);
       }

       public function stocks()
       {
           return $this->hasMany(Stock::class);
       }

       public function returnProducts() {
            return $this->hasMany(ReturnProduct::class);
       }
}
