<?php

namespace App\Http\Middleware;

use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

class EnsureFrontendRequestsAreStateful
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, $next)
    {
        if ($this->isFrontendRequest($request)) {
            config(['sanctum.guard' => 'web']);
        }

        return $next($request);
    }

    /**
     * Determine if the request is from a frontend.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function isFrontendRequest($request)
    {
        return Sanctum::currentApplicationUrlWithPort() === $request->header('Origin') ||
            Str::is(config('sanctum.stateful', []), $request->getHost());
    }
}