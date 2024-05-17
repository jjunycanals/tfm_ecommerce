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
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('order_number')->unique();
            $table->string('name');
            $table->string('email');
            $table->string('address');
            $table->string('product_quantity');
            $table->enum('status', ['new', 'producing', 'packaging', 'shipping', 'shipped', 'delivered'])->default('new');
            $table->string('payment_method');
            $table->string('iban');
            $table->decimal('price', 8, 2);
            $table->decimal('total_price', 8, 2);
            $table->decimal('shipping_cost', 8, 2);
            $table->decimal('subtotal', 8, 2);
            $table->decimal('tax', 8, 2);
            $table->date('delivery_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};