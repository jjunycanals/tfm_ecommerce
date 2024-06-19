<?php

// use App\Http\Controllers\Auth\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthenticatedSessionController;

Route::middleware(['cors'])->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    Route::post('/orders', [OrderController::class, 'store']);

    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::patch('/orders/{id}', [OrderController::class, 'updatePatch']);

    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

    // Rutes de Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::patch('/products/{id}', [ProductController::class, 'updatePatch']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // USER
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    // Route::post('/register', [UserController::class, 'store']);
    // Route::post('/login', [UserController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});


// Route::middleware('auth:sanctum')->get('/orders', 'OrderController@index');

Route::middleware(['auth:sanctum'])->group(function () {
    // USERS
    Route::post('/register', [UserController::class, 'store']);
    Route::post('/login', [UserController::class, 'store']);
    // // ORDERS
    // Route::post('/orders', [OrderController::class, 'store']);
    // Route::put('/orders/{id}', [OrderController::class, 'update']);
    // Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

    // // PRODUCTS
    // Route::post('/products', [ProductController::class, 'store']);
    // Route::put('/products/{id}', [ProductController::class, 'update']);
    // Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});