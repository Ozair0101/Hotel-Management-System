<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceItem extends Model
{
    protected $fillable = [
        'name',
        'description',
        'quantity'
    ];

    public function menuServices(){
        return $this->belongsToMany(MenuService::class, 'menu_service_service_item');
    }
}
