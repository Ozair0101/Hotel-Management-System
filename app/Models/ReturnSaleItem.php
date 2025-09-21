<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReturnSaleItem extends Model
{
    protected $fillable = [
        'product_id',   
        'return_sale_id',
        'quantity_returned',
        'refund_amount',
    ];
    
    public function product() {
        return $this->belongsTo(Product::class);
    }
    public function returnSale() {
        return $this->belongsTo(ReturnSale::class);
    }
}
