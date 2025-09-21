<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu_item_service', function (Blueprint $table) {
           $table->unsignedBigInteger('service_item_id');
           $table->unsignedBigInteger('menu_service_id');
           $table->primary(['service_item_id', 'menu_service_id']);
           $table->foreign('menu_service_id')->references('id')->on('menu_services')->onDelete('cascade');
           $table->foreign('service_item_id')->references('id')->on('service_items')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};
