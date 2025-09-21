<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalePayment extends Model
{
    protected $fillable = [
        'sale_id',
        'payment_date',
        'amount_paid',
        'remaining_amount',
    ];

    public function sale() {
        return $this->belongsTo(Sale::class);
    }
}
