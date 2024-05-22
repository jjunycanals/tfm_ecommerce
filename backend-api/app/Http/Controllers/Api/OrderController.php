<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()  {
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
    public function create(Request $request) {
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
        $order = Orders::find($id);
        if (!$order) {
            $data = [
                'message' => 'Order not found en Show find Order',
                'status' => 404
            ];
            return response()->json($data, 404);
        } else {
            $data = [
                'message' => $order,
                'status' => 203
            ];
            return response()->json($data, 203);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $order = Orders::find($id);

        if (!$order) {
            $data = [
                'message' => 'Order no trobada en Edit find Order',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'message' => 'Order details editades amb èxit',
            'order' => $order,
            'status' => 204
        ];
        return response()->json($data, 204);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Or = Orders::find($id);

        if(!$Or) {
            $data = [
                'message' => 'Order not found en Update find Order',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
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
                'message' => 'Error en la validació de dades Update Order',
                'errors' => $validator->errors(),
                'status' => '400'
            ];
            return response()->json($data, 400);
        }

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

        $Or->save();
        $data = [
            'message' => 'Update fet amb Update Order',
            'order' => $Or,
            'status' => '204'
        ];
        return response()->json($data, 204);

    }


    /**
     * Update the specified field of specified resource in storage.
     */
    public function updatePatch(Request $request, string $id)
    {
        $Or = Orders::find($id);

        if(!$Or) {
            $data = [
                'message' => 'Order not found en UpdatePatch find Order',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'email' => 'email',
            'address' => 'string',
            'product_quantity' => 'integer',
            'payment_method' => 'string',
            'iban' => 'string',
            'price' => 'numeric'
        ]);
        if($validator->fails()) {
            $data = [
                'message' => 'Error en la validació de dades UpdatePatch Order',
                'errors' => $validator->errors(),
                'status' => '400'
            ];
            return response()->json($data, 400);
        }

        if ($request->has('name')) {
            $Or->name = $request->name;
        } elseif ($request->has('email')) {
            $Or->email = $request->email;
        } elseif ($request->has('address')) {
            $Or->address = $request->address;
        } elseif ($request->has('product_quantity')) {
            $Or->product_quantity = $request->product_quantity;
        } elseif ($request->has('status')) {
            $Or->status = $request->status;
        } elseif ($request->has('payment_method')) {
            $Or->payment_method = $request->payment_method;
        } elseif ($request->has('iban')) {
            $Or->iban = $request->iban;
        } elseif ($request->has('price')) {
            $Or->price = $request->price;
        } elseif ($request->has('total_price')) {
            $Or->total_price = $request->total_price;
        } elseif ($request->has('shipping_cost')) {
            $Or->shipping_cost = $request->shipping_cost;
        } elseif ($request->has('subtotal')) {
            $Or->subtotal = $request->subtotal;
        } elseif ($request->has('tax')) {
            $Or->tax = $request->tax;
        } elseif ($request->has('delivery_date')) {
            $Or->delivery_date = $request->delivery_date;
        }

        $Or->save();
        $data = [
            'message' => 'Update field fet amb UpdatePatch Order',
            'order' => $Or,
            'status' => '205'
        ];
        return response()->json($data, 205);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Or = Orders::findOrFail($id);
        $Or->delete();
        $data = [
            'message' => 'Order eliminada',
            'status' => 200
        ];
        return response()->json($data,200);
    }
}