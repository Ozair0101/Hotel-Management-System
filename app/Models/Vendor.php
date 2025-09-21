<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'address',
    ];

    public function expences() {
        return $this->hasMany(Expence::class);
    }
}
