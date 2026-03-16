<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * EnsureUserRole
 *
 * Guards routes so only users with the specified role may pass.
 *
 * Usage in routes/web.php:
 *   Route::middleware(['auth', 'role:admin'])->group(function () { … });
 */
class EnsureUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (! $request->user()) {
            abort(401, 'Unauthenticated.');
        }

        // Allow if the authenticated user has any of the required roles.
        foreach ($roles as $role) {
            if ($request->user()->hasRole($role)) {
                return $next($request);
            }
        }

        abort(403, 'You do not have permission to access this resource.');
    }
}
