<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;
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



}
