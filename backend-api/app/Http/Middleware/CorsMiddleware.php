<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return mixed
     * */
    public function handle(Request $request, Closure $next): Response
    {
        // $response = $next($request);
        // $response->headers->set('Access-Control-Allow-Origin', '*');
        // $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // // Tractar les solicituds de OPTIONS
        // if ($request->getMethod() === "OPTIONS") {
        //     return response()->json('', 200, $response->headers->all());
        // }

        // return $response;
        $allowedOrigins = ['http://localhost:4200', 'http://127.0.0.1:4200'];

        $origin = $request->headers->get('Origin');

        if (in_array($origin, $allowedOrigins)) {
            $response = $next($request);
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            // Handle preflight requests
            if ($request->getMethod() === "OPTIONS") {
                return response()->json('', 200, $response->headers->all());
            }

            return $response;
        }

        return $next($request);
    }
}