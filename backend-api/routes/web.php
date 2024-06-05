<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::resource('orders', 'OrderController');
Route::resource('products', 'ProductController');

require __DIR__.'/auth.php';
