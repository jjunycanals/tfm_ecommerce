<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
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
}