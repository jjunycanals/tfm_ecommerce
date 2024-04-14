<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Orders::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Orders::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Or = Orders::findOrFail($id);
        $Or->name = $request->name;
        $Or->email = $request->email;
        $Or->address = $request->address;
        $Or->product_quantity = $request->product_quantity;
        $Or->status = $request->status;
        $Or->payment_method = $request->payment_method;
        $Or->iban = $request->iban;
        $Or->price = $request->price;
        $Or->total_price = $request->total_price;
        $Or->shipping_cost = $request->shipping_cost;
        $Or->subtotal = $request->subtotal;
        $Or->tax = $request->tax;
        $Or->delivery_date = $request->delivery_date;

        $Or->update();
        return $Or;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Or = Orders::findOrFail($id);
        $Or->delete();
    }
}