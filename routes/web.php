<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Models\Trello;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/trello', function (Trello $trello) {
    return $trello->getAuthenticated();
});

Route::get('trello-api/valid-token', function (Trello $trello) {
    return $trello->isTokenValid();
});

Route::group(['prefix' => 'trello-api'], function() {
    Route::get('/valid-token/{token}', function ($token, Trello $trello) {
        return $trello->isTokenValid($token);
    });
});

Route::get('/{url?}', function () {
    return view('app');
})->where('', 'list');

Route::group(['prefix' => 'auth'], function() {
    Route::get('/install', [MainController::class, 'install']);
    Route::get('/load', [MainController::class, 'load']);
    Route::get('/uninstall', [MainController::class, 'uninstall']);
    Route::get('/remove-user', [MainController::class, 'removeUser']);
});

Route::any('/bc-api/{endpoint}', [MainController::class, 'proxyBigCommerceAPIRequest'])
    ->where('endpoint', 'v2\/.*|v3\/.*');

