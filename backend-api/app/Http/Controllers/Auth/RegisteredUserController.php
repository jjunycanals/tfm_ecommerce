<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request) {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($request->fails()) {
            $data = [
                'message' => 'Error en la validació de dades Create Users de RegistredUserController',
                'errors' => $request->errors(),
                'status' => '400'
            ];
            return response()->json($data, 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if (!$user) {
            $data = [
                'message' => 'Error en la creació de users en RegistredUserController',
                'status' => '500'
            ];
            return response()->json($data, 500);
        }

        event(new Registered($user));

        Auth::login($user);

        $data = [
            'product' => $user,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
}