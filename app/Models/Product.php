<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'product_name',
        'made_from',
        'category',
    ];
   
    function stock() {
        return $this->HasMany(Stock::class);
    }

    public function purchaseItems()
    {
        return $this->hasMany(PurchaseItem::class);
    }

    public function returnProducts() {
        return $this->hasMany(ReturnProduct::class);
   }

   public function saleItems() {
        return $this->hasMany(SaleItems::class);
   }

   public function sendKitchenItem() {
        return $this->hasMany(SendKitchenItem::class);
   }

   public function returnItems() {
        return $this->hasMany(ReturnSaleItem::class);
   }
   
}
