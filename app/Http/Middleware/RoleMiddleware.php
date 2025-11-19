<?php

namespace App\Http\Middleware;

use Closure;

class RoleMiddleware
{
    public function handle($request, Closure $next, $roles)
    {
        $roleList = explode(',', $roles);
        if (!in_array($request->user()->role, $roleList)) {
            return response()->json(['message' => 'Tidak punya akses'], 403);
        }
        return $next($request);
    }
}
