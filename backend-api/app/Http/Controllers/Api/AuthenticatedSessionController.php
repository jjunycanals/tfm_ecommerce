<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): Response
    {
        // Validació del login
        $request->authenticate();
        // Genera un ID de sessió
        $request->session()->regenerate();
        // En cas sense contingut retorna un response 204
        return response()->noContent();
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        // Tanca la sessió d'usuari
        Auth::guard('web')->logout();
        // Invalida la sessió actual
        $request->session()->invalidate();
        // Regenera el token de CSRF
        $request->session()->regenerateToken();
        // Retorna un 204 sense contingut
        return response()->noContent();
    }
}