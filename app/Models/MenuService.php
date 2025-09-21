<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuService extends Model
{
    protected $fillable = [
        'menu',
        'price',
    ];

    public function serviceItems() {
        return $this->belongsToMany(ServiceItem::class, 'menu_service_service_item');
    }
    public function reservation() {
        return $this->hasMany(Reservation::class);        
    } 
}
