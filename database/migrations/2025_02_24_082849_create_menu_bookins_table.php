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
        Schema::create('menu_bookings', function (Blueprint $table) {
            $table->id();
            $table->integer('menu')->unique();
            $table->decimal('price');
            for ($i=1; $i <= 10 ; $i++) { 
                $table->string("input$i");
            }
            for ($i=11; $i <= 50 ; $i++) { 
                $table->string("input$i")->nullable();
            }
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_bookins');
    }
};
