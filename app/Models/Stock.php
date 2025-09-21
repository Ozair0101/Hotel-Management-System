<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
        'product_id',
        'purchase_id',
        'expire_date',
        'batch',
        'unit_price',
        'quantity',
    ];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function purchase() {
        return $this->belongsTo(Purchase::class);    
    }
}
