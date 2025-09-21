<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SendKitchen extends Model
{
    protected $fillable = [
        'reservation_id',   
        'date',
        'total_amount',
        'total_discount',
    ];

    public function reservation() {
        return $this -> belongsTo(Reservation::class);
    }

    public function sendKitchenItem() {
        return $this->hasMany(SendKitchenItem::class);
    }
}
