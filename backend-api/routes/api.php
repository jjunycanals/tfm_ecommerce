<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\OrderController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/orders', [OrderController::class, 'index']);

Route::post('/orders', [OrderController::class, 'store']);

Route::put('/orders/{id}', function ($id) {
    return 'Order Update $id';
});
Route::delete('users/{id}', function ($id) {
    return ("Delete Order " + $id);
});