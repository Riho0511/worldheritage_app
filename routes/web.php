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


Auth::routes();
Route::get('guest', 'Auth\LoginController@guestLogin')->name('login.guest');
Route::group(['middleware' => 'auth'], function() {
    Route::get('/', function () {
        return view('app');
    });
    Route::get('/api', 'CountryController@index');
    Route::get('/api/mypage', 'UserController@mypage');
    Route::post('/api/currency', 'CurrencyController@delete');
    Route::post('/api/country', 'CountryController@store');
    Route::post('/api/heritage', 'HeritageController@store');
    Route::get('/api/country/currency/list', 'CurrencyController@list');
    Route::get('/api/country/state/{state}', 'CountryController@state');
    Route::get('/api/country/create/{state}', 'CountryController@countryCreate');
    Route::get('/api/country/{country}', 'CountryController@country');
    Route::put('/api/country/{country}',  'CountryController@update');
    Route::post('/api/country/{country}', 'CountryController@delete');
    Route::get('/api/country/{country}/edit', 'CountryController@countryEdit');
    Route::post('/api/country/{country}/user/{user}/nice', 'NiceController@niceCountry');
    Route::post('/api/country/{country}/user/{user}/unnice', 'NiceController@unniceCountry');
    Route::post('/api/country/{country}/user/{user}/collect', 'CollectController@collectCountry');
    Route::post('/api/country/{country}/user/{user}/nocollect', 'CollectController@nocollectCountry');
    Route::get('/api/country/{country}/heritage/{heritage}/edit', 'CountryController@heritageEdit');
    Route::get('/api/country/{country}/heritage/{heritage}', 'CountryController@heritage');
    Route::put('/api/country/{country}/heritage/{heritage}', 'HeritageController@update');
    Route::post('/api/country/{country}/heritage/{heritage}', 'HeritageController@delete');
    Route::post('/api/heritage/{heritage}/user/{user}/nice', 'NiceController@niceHeritage');
    Route::post('/api/heritage/{heritage}/user/{user}/unnice', 'NiceController@unniceHeritage');
    Route::post('/api/heritage/{heritage}/user/{user}/collect', 'CollectController@collectHeritage');
    Route::post('/api/heritage/{heritage}/user/{user}/nocollect', 'CollectController@nocollectHeritage');
});