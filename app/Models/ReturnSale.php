<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReturnSale extends Model
{
    protected $fillable = [
        'sale_id',   
        'reason',
        'total_refund_amount',
        'return_date'
    ];

    public function sale(){
        return $this->belongsTo(Sale::class);
    }
    public function items() {
        return $this->hasMany(ReturnSaleItem::class);
    }
}
