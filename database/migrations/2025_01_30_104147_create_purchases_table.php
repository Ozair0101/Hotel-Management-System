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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
            $table->date('purchase_date');
            $table->string('bill_number')->unique();
            $table->enum('payment_type', ['cash', 'loan', 'partially'])->default('loan');
            $table->decimal('total_amount',10 ,2);
            $table->decimal('discount_cash', 5, 2)->default(0);
            $table->decimal('final_amount', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
