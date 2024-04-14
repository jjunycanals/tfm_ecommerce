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
        Schema::create('products', function (Blueprint $table) {
            $table->bigInteger('id')->unique();
            $table->bigIncrements('product_number');
            $table->string('name');
            $table->text('description');
            $table->text('features');
            $table->enum('size', ['XL', 'L', 'M', 'S', 'XS', 'U'])->default('U');
            $table->decimal('price', 8, 2);
            $table->text('images');
            $table->string('product_size');
            $table->string('short_message');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};