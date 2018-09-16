<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 9/15/2018
 * Time: 5:48 PM
 */

namespace App\Http\Middleware;


use Illuminate\Auth\Access\AuthorizationException;

class UserAdmin
{
    public function handle($request, \Closure $next)
    {
        $user = auth()->guard()->user();

        if (!$user->is_admin) {
            throw new AuthorizationException("You are not allowed to access resource.");
        }

        return $next($request);
    }
}