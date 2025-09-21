<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $casts = [
        'menu_services' => 'array'
    ];

    protected $fillable = [
        'firstName',
        'fatherName',
        'lastName' ,
        'personQuantity' ,
        'type' ,
        'hall_id' ,
        'menu_services_id',
        'typeDays' ,
        'date' ,
        'menu_price',
        'menu_services',
        'phone'
    ];

    public function hall() {
        return $this ->belongsTo(Hall::class);
    }

    public function menuServices() {
        return $this ->belongsTo(MenuService::class);
    }

    public function reservationPayment() {
        return $this -> hasOne(ReservationPayment::class);
    }

    public function sendKitchen() {
        return $this->hasMany(SendKitchen::class);
    }
}
  