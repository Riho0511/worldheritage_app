<?php

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

// Route::get('guest', 'Auth\LoginController@guestLogin')->name('login.guest');

Auth::routes();

// ゲスト、会員共通
Route::get('/', function () {
    return view('app');
});
Route::get('/home', function () {
    return view('app');
});
Route::get('/api/home', 'CountryController@index');
Route::get('/api/ranking', 'UserController@ranking');
Route::get('/api/country/state/{state}', 'CountryController@state');
Route::get('/api/country/{country}', 'CountryController@country');
Route::get('/api/country/{country}/heritage/{heritage}', 'CountryController@heritage');

// 会員限定
Route::group(['middleware' => 'auth'], function() {
    Route::get('/api/mypage', 'UserController@mypage');
    Route::post('/api/currency', 'CurrencyController@delete'); // 管理者限定
    Route::post('/api/country', 'CountryController@store'); // 管理者限定
    Route::post('/api/heritage', 'HeritageController@store'); // 管理者限定
    Route::get('/api/country/currency/list', 'CurrencyController@list'); // 管理者限定
    Route::get('/api/country/create/{state}', 'CountryController@countryCreate'); // 管理者限定
    Route::put('/api/country/{country}',  'CountryController@update');
    Route::post('/api/country/{country}', 'CountryController@delete'); // 管理者限定
    Route::get('/api/country/{country}/edit', 'CountryController@countryEdit');
    Route::post('/api/country/{country}/user/{user}/nice', 'NiceController@niceCountry');
    Route::post('/api/country/{country}/user/{user}/unnice', 'NiceController@unniceCountry');
    Route::post('/api/country/{country}/user/{user}/collect', 'CollectController@collectCountry');
    Route::post('/api/country/{country}/user/{user}/nocollect', 'CollectController@nocollectCountry');
    Route::get('/api/country/{country}/heritage/{heritage}/edit', 'CountryController@heritageEdit');
    Route::put('/api/country/{country}/heritage/{heritage}', 'HeritageController@update');
    Route::post('/api/country/{country}/heritage/{heritage}', 'HeritageController@delete'); // 管理者限定
    Route::post('/api/heritage/{heritage}/user/{user}/nice', 'NiceController@niceHeritage');
    Route::post('/api/heritage/{heritage}/user/{user}/unnice', 'NiceController@unniceHeritage');
    Route::post('/api/heritage/{heritage}/user/{user}/collect', 'CollectController@collectHeritage');
    Route::post('/api/heritage/{heritage}/user/{user}/nocollect', 'CollectController@nocollectHeritage');
});