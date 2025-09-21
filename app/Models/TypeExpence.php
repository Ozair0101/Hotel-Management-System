<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeExpence extends Model
{
    protected $fillable = [
        'name',
    ];

    public function expence() {
        return $this->hasMany(Expence::class); 
    }
}
