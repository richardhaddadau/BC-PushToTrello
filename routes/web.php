<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;

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

Route::get('/{url?}', function () {
    return view('app');
})->where('', 'list');

Route::group(['prefix' => 'auth'], function() {
    Route::get('/install', [MainController::class, 'install']);
    Route::get('/load', [MainController::class, 'load']);
    Route::get('/uninstall', [MainController::class, 'uninstall']);
    Route::get('/remove-user', [MainController::class, 'removeUser']);
});

