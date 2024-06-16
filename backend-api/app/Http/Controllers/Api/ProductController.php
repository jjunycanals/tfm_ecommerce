<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Products::all();
        if ($products->isEmpty()) {
            $data = [
                'message' => 'No es troben products',
                'status' => '200'
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => $products,
                'status' => '200'
            ];
            return response()->json($data, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('products.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'features' => 'required|string',
            'size' => 'required|string',
            'price' => 'required|numeric',
            'images' => 'required|string',
            'product_size' => 'required|string',
            'short_message' => 'required|string'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validació de dades Create Product',
                'errors' => $validator->errors(),
                'status' => '400'
            ];
            return response()->json($data, 400);
        }

        $product = Products::create($request->all());

        if (!$product) {
            $data = [
                'message' => 'Error en la creació de Product',
                'status' => '500'
            ];
            return response()->json($data, 500);
        }

        $data = [
            'product' => $product,
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Products::find($id);
        if (!$product) {
            $data = [
                'message' => 'Product not found en Show find Product',
                'status' => 404
            ];
            return response()->json($data, 404);
        } else {
            $data = [
                'message' => $product,
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
        $product = Products::find($id);

        if (!$product) {
            $data = [
                'message' => 'Product no trobat en Edit find Product',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'message' => 'Product details editades amb èxit',
            'product' => $product,
            'status' => 204
        ];
        return response()->json($data, 204);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Products::find($id);
        Log::info($product);
        Log::info($product);
        Log::info($product);
        if (!$product) {
            $data = [
                'message' => 'Product not found en Update find Product',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'features' => 'required|string',
            'size' => 'required|string',
            'price' => 'required|numeric',
            'images' => 'required|string',
            'product_size' => 'required|string',
            'short_message' => 'required|string'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validació de dades Update Product',
                'errors' => $validator->errors(),
                'status' => '400'
            ];
            return response()->json($data, 400);
        }

        // $product->update($request->all());
        // $product->fill($request->only([
        //     'name', 'description', 'features', 'size', 'price', 'images', 'product_size', 'short_message'
        // ]));
        $product->name = $request->name;
        $product->description = $request->description;
        $product->features = $request->features;
        $product->size = $request->size;
        $product->price = $request->price;
        $product->images = $request->images;
        $product->product_size = $request->product_size;
        $product->short_message = $request->short_message;

        $product->save();


        $data = [
            'message' => 'Update fet amb Update Product',
            'product' => $product,
            'status' => '204'
        ];
        return response()->json($data, 204);
    }

 /**
     * Update the specified field of specified resource in storage.
     */
    public function updatePatch(Request $request, string $id)
    {
        $product = Products::find($id);

        if (!$product) {
            $data = [
                'message' => 'Product not found en UpdatePatch find Product',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'description' => 'string',
            'features' => 'string',
            'size' => 'string',
            'price' => 'numeric',
            'images' => 'string',
            'product_size' => 'string',
            'short_message' => 'string'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validació de dades UpdatePatch Product',
                'errors' => $validator->errors(),
                'status' => '400'
            ];
            return response()->json($data, 400);
        }

        if ($request->has('name')) {
            $product->name = $request->name;
        }
        if ($request->has('description')) {
            $product->description = $request->description;
        }
        if ($request->has('features')) {
            $product->features = $request->features;
        }
        if ($request->has('size')) {
            $product->size = $request->size;
        }
        if ($request->has('price')) {
            $product->price = $request->price;
        }
        if ($request->has('images')) {
            $product->images = $request->images;
        }
        if ($request->has('product_size')) {
            $product->product_size = $request->product_size;
        }
        if ($request->has('short_message')) {
            $product->short_message = $request->short_message;
        }

        $product->save();

        $data = [
            'message' => 'Update field fet amb UpdatePatch Product',
            'product' => $product,
            'status' => '205'
        ];
        return response()->json($data, 205);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $product = Products::findOrFail($id);
        $product->delete();
        $data = [
            'message' => 'Product eliminat',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}