protected $middlewareGroups = [
'web' => [

],

'api' => [
\App\Http\Middleware\CorsMiddleware::class,
\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
'throttle:api',
\Illuminate\Routing\Middleware\SubstituteBindings::class,
],
];