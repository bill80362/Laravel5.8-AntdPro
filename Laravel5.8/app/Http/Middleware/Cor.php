<?php

namespace App\Http\Middleware;

use Closure;

class Cor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $origin = $request->server('HTTP_ORIGIN') ? $request->server('HTTP_ORIGIN') : '';
        $allow_origin = [
            'http://localhost:8000',
        ];
//        if (in_array($origin, $allow_origin)) {
            //不能 *
            $origin = 'http://localhost:8000';
            $response->header('Access-Control-Allow-Origin', $origin);
            //以下是處理跨域OPTIONS
            $response->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
            $response->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
            $response->header('Access-Control-Allow-Credentials', 'true');
//        }
        return $response;
    }
}
