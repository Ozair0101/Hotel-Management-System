<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'first_name',
        'phone',
        'address'
    ];

    public function sales() {
        return $this->hasMany(Sale::class);
    }
}
