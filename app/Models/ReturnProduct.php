<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReturnProduct extends Model
{
    protected $fillable = [
        'product_id',    
        'purchase_id',   
        'quantity_returned',
        'return_reason',
        'return_date'
    ];
    
    public function purchase() {
        return $this->belongsTo(Purchase::class);
    }

    public function product() {
        return $this->belongsTo(Product::class);
    }
}
