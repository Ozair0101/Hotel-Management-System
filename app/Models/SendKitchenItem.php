<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SendKitchenItem extends Model
{
    protected $fillable = [
        'product_id',
        'send_kitchen_id',
        'batch',
        'quantity',
        'unit_price',
        'discount_per_unit'
    ];

    public function sendKitchen (){
        return $this -> belongsTo(SendKitchen::class);
    }

    public function product() {
        return $this->belongsTo(Product::class);
    }
}
