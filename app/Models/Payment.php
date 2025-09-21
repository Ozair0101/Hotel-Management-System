<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'purchase_id',
        'payment_date',
        'payment_type',
        'amount_paid',
        'remaining_amount',
    ];

    public function purchase() {
        return $this->belongsTo(Purchase::class);
    }
}
