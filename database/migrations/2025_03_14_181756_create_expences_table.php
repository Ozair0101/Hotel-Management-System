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
        Schema::create('expences', function (Blueprint $table) {
            $table->id();
            $table->date('date'); 
            $table->decimal('amount'); 
            $table->text('remark')->nullable();
            $table->enum('payment_method', ['cash', 'loan', 'bank']); 
            $table->foreignId('employee_id')->nullable()->constrained('employees')->onDelete('cascade');
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->onDelete('cascade');
            $table->foreignId('type_expences_id')->constrained('type_expences')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expences');
    }
};
