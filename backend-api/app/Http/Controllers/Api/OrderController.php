<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Orders::all();

        if ($orders->isEmpty()) {
            $data = [
                'message' => 'No es troben orders',
                'status' => '200'
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => $orders,
                'status' => '200'
            ];
            return response() -> json($data, 200);
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return view('orders.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'address' => 'required|string',
            'product_quantity' => 'required|integer',
            'payment_method' => 'required|string',
            'iban' => 'required|string',
            'price' => 'required|numeric'
        ]);
        if($validator->fails()) {
            $data = [
                'message' => 'Error en la validació de dades Create Order',
                'errors' => $validator->errors(),
                'status' => '400'
            ];
            return response()->json($data, 400);
        }

        $order = Orders::create($request->all());

        if (!$order) {
            $data = [
                'message' => 'Error en la creació de Order',
                'status' => '500'
            ];
            return response()->json($data, 500);
        }

        $data = [
            'order' => $order,
            'status' => 201
        ];
        return response()->json($data, 201);

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
        // $Or = Orders::findOrFail($id);
        // $Or->name = $request->name;
        // $Or->email = $request->email;
        // $Or->address = $request->address;
        // $Or->product_quantity = $request->product_quantity;
        // $Or->status = $request->status;
        // $Or->payment_method = $request->payment_method;
        // $Or->iban = $request->iban;
        // $Or->price = $request->price;
        // $Or->total_price = $request->total_price;
        // $Or->shipping_cost = $request->shipping_cost;
        // $Or->subtotal = $request->subtotal;
        // $Or->tax = $request->tax;
        // $Or->delivery_date = $request->delivery_date;

        // $Or->update();
        // return $Or;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // $Or = Orders::findOrFail($id);
        // $Or->delete();
    }
}
