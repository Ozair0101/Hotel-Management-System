<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    protected $fillable = [
        'name',
        'type',
        'capacity'
    ];

    public function reservation() {
        return $this->hasMany(Reservation::class);
    }
}
