<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationPayment extends Model
{
    
    protected $fillable = [
       'reservation_id',
       'payment_date',
        'due',
        'amount_paid',
        'payment_type'
    ];

    public function reservation() {
        return $this ->belongsTo(Reservation::class);
    }
}
