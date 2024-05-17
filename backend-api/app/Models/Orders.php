<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = [
        'order_number',
        'name',
        'email',
        'address',
        'product_quantity',
        'status',
        'payment_method',
        'iban',
        'price',
        'total_price',
        'shipping_cost',
        'subtotal',
        'tax',
        'delivery_date'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            // Obtenim l'últim nombre de comanda
            $lastOrder = Orders::orderBy('order_number', 'desc')->first();

            // Incrementem +1 al nombre order_number
            $order->order_number = $lastOrder ? $lastOrder->order_number + 1 : 1;
        });
    }


}