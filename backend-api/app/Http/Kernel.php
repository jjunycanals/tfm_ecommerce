protected $middlewareGroups = [
'web' => [
\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
\Illuminate\Session\Middleware\StartSession::class,
\Illuminate\View\Middleware\ShareErrorsFromSession::class,
\App\Http\Middleware\VerifyCsrfToken::class,
],
'api' => [
\App\Http\Middleware\CorsMiddleware::class,
'throttle:api',
\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
\Illuminate\Routing\Middleware\SubstituteBindings::class,
\App\Http\Middleware\EncryptCookies::class,
\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
\Illuminate\Session\Middleware\StartSession::class,
\Illuminate\View\Middleware\ShareErrorsFromSession::class,
\App\Http\Middleware\VerifyCsrfToken::class,
\Fruitcake\Cors\HandleCors::class,
],
];