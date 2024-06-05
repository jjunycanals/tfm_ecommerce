<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        if ($users->isEmpty()) {
            $data = [
                'message' => 'No es troben users',
                'status' => '200'
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => $users,
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
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validació de dades Create Product',
                'errors' => $validator->errors(),
                'status' => '400'
            ];
            return response()->json($data, 400);
        }

        $users = User::create($request->all());

        if (!$users) {
            $data = [
                'message' => 'Error en la creació de users',
                'status' => '500'
            ];
            return response()->json($data, 500);
        }

        $data = [
            'product' => $users,
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $users = User::find($id);
        if (!$users) {
            $data = [
                'message' => 'users not found en Show find users',
                'status' => 404
            ];
            return response()->json($data, 404);
        } else {
            $data = [
                'message' => $users,
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
        $users = User::find($id);

        if (!$users) {
            $data = [
                'message' => 'users no trobat en Edit find users',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'message' => 'users details editades amb èxit',
            'users' => $users,
            'status' => 204
        ];
        return response()->json($data, 204);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $users = User::find($id);

        if (!$users) {
            $data = [
                'message' => 'users not found en Update find users',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validació de dades Update Product',
                'errors' => $validator->errors(),
                'status' => '400'
            ];
            return response()->json($data, 400);
        }

        $users->update($request->all());

        $data = [
            'message' => 'Update fet amb Update Product',
            'product' => $users,
            'status' => '204'
        ];
        return response()->json($data, 204);
    }

 /**
     * Update the specified field of specified resource in storage.
     */
    public function updatePatch(Request $request, string $id)
    {
        $users = User::find($id);

        if (!$users) {
            $data = [
                'message' => 'users not found en UpdatePatch find users',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'email' => 'string',
            'password' => 'string'
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
            $users->name = $request->name;
        }
        if ($request->has('description')) {
            $users->description = $request->description;
        }
        if ($request->has('features')) {
            $users->features = $request->features;
        }

        $users->save();

        $data = [
            'message' => 'Update field fet amb UpdatePatch Product',
            'product' => $users,
            'status' => '205'
        ];
        return response()->json($data, 205);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $users = User::findOrFail($id);
        $users->delete();
        $data = [
            'message' => 'user eliminat',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}