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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hall_id')->constrained('halls')->onDelete('cascade');
            $table->date('date');
            $table->enum('typeDays', ['Night', 'Day']);
            $table->foreignId('menu_services_id')->constrained('menu_services')->onDelete('cascade');
            $table->string('phone');
            $table->decimal('menu_price');
            $table->string('firstName');
            $table->string('fatherName');
            $table->string('lastName');
            $table->string('type');
            $table->integer('personQuantity');
            $table->json('menu_services');
            $table->timestamps();
            $table->unique(['hall_id', 'date', 'typeDays']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
