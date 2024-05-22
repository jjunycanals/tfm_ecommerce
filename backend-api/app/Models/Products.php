<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'product_number',
        'name',
        'description',
        'features',
        'size',
        'price',
        'images',
        'product_size',
        'short_message'
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            // Obtenim l'últim nombre de products
            $lastProduct = Products::orderBy('product_number', 'desc')->first();

            // Incrementem +1 al nombre product_number
            $product->product_number = $lastProduct ? $lastProduct->product_number + 1 : 1;
        });
    }
}