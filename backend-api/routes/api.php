<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\OrderController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{id}', [OrderController::class, 'show']);

Route::post('/orders', [OrderController::class, 'store']);

Route::put('/orders/{id}', [OrderController::class, 'update']);
Route::patch('/orders/{id}', [OrderController::class, 'updatePatch']);

Route::delete('/orders/{id}', [OrderController::class, 'destroy']);