<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'customer_id',
        'sale_date',
        'invoice_number',
        'payment_type',
        'total_amount',
        'total_discount',
        'final_amount',
    ];

    protected static function boot() {
        parent::boot();
        static::creating(function ($model){
            $model->invoice_number = 'EH' . date('y') . str_pad(self::max('id')+1, 4, '0', STR_PAD_LEFT);
            // $model->save();
        });
    }

    public function saleItems() {
        return $this -> hasMany(SaleItems::class);
    }

    public function customer() {
        return $this -> belongsTo(Customer::class);
    }

    public function payment() {
        return $this->hasOne(SalePayment::class);
    }

    public function returnSales() {
        return $this->hasMany(ReturnSale::class);
    }
}

