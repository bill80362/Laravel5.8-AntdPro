<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('home', 'HomeController@index2');

Route::group([
    'middleware' => ['cor'],//api
//    'prefix' => 'auth'
], function ($router) {
    Route::post('login/account', 'AuthController@login');//登入
    Route::post('logout', 'AuthController@logout');//登出
    Route::post('refresh', 'AuthController@refresh');//更新token

    Route::get('currentUser', 'AuthController@currentUser');//取的自己資料
    Route::post('update', 'AuthController@update');//更新自己資料

    Route::post('create', 'AuthController@create');//建立下層

    //處理跨域-非簡單請求
    Route::options('currentUser', function (){return 'options_ok';});

});

Route::group([
    'middleware' => ['cor'],//api
    'prefix' => 'agent'
], function ($router) {
    Route::get('index', 'AgentController@index');//列表
    Route::post('update', 'AgentController@update');//更新
    Route::post('store', 'AgentController@store');//新增下層
});

Route::group([
    'middleware' => ['cor'],//api
    'prefix' => 'gamegroup'
], function ($router) {
    Route::get('index', 'GameGroupController@index');//列表
    Route::post('update', 'GameGroupController@update');//更新
    Route::post('store', 'GameGroupController@store');//新增下層
});


