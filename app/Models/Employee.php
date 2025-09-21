<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'address',
        'lastName',
        'position'
    ];
    public function expences() {
        return $this->hasMany(Expence::class);
    }
}
