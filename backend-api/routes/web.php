<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::resource('orders', 'OrderController');
Route::resource('products', 'ProductController');
Route::resource('user', 'UserController');
Route::resource('login', 'UserController');


require __DIR__.'/auth.php';
