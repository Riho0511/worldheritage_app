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

// ゲスト、会員共通 // なくて良い（バグチェックが終了次第）
Route::get('/', function() { return view('app'); });
Route::get('/home', function () { return view('app'); });

Route::get('/api/states', 'StateController@index'); // 州一覧取得
Route::get('/api/state/{state}', 'StateController@state'); // 州別国情報取得
Route::get('/api/country/{country}', 'CountryController@show'); // 国情報取得
Route::get('/api/country/{country}/heritage/{heritage}', 'HeritageController@show'); // 世界遺産情報取得
Route::get('/api/country/{country}/heritage/{heritage}/comments', 'CommentController@index'); // コメント一覧取得
Route::get('/api/ranking', 'UserController@ranking');


// 会員限定
Route::group(['middleware' => 'auth'], function() {
    
    // お気に入り、コレクト
    Route::post('/api/country/{country}/like', 'LikeController@like_country');
    Route::post('/api/country/{country}/unlike', 'LikeController@unlike_country');
    Route::post('/api/country/{country}/collect', 'CollectController@collect_country');
    Route::post('/api/country/{country}/uncollect', 'CollectController@uncollect_country');
    Route::post('/api/heritage/{heritage}/like', 'LikeController@like_heritage');
    Route::post('/api/heritage/{heritage}/unlike', 'LikeController@unlike_heritage');
    Route::post('/api/heritage/{heritage}/collect', 'CollectController@collect_heritage');
    Route::post('/api/heritage/{heritage}/uncollect', 'CollectController@uncollect_heritage');
    
    // コメント投稿
    Route::post('/api/heritage/{heritage}/comment', 'CommentController@comment');
    Route::post('/api/heritage/{heritage}/uncomment', 'CommentController@delete');
    
    // 画像投稿
    Route::post('/api/heritage/{heritage}/images', 'ImageController@store');
    
    // マイページ
    Route::get('/api/mypage', 'UserController@mypage');
    Route::get('/api/mypage/edit', 'UserController@edit');
    Route::post('/api/user/delete', 'UserController@delete');
    Route::post('/api/user/{user}/update', 'UserController@update');
    
    
    Route::post('/api/currency', 'CurrencyController@delete'); // 管理者限定
    Route::post('/api/country', 'CountryController@store'); // 管理者限定
    Route::post('/api/heritage', 'HeritageController@store'); // 管理者限定
    Route::get('/api/country/currency/list', 'CurrencyController@list'); // 管理者限定
    Route::get('/api/country/create/{state}', 'CountryController@countryCreate'); // 管理者限定
    Route::put('/api/country/{country}',  'CountryController@update');
    Route::post('/api/country/{country}', 'CountryController@delete'); // 管理者限定
    Route::get('/api/country/{country}/edit', 'CountryController@countryEdit');
    Route::get('/api/country/{country}/heritage/{heritage}/edit', 'CountryController@heritageEdit');
    Route::put('/api/country/{country}/heritage/{heritage}', 'HeritageController@update');
    Route::post('/api/country/{country}/heritage/{heritage}', 'HeritageController@delete'); // 管理者限定

});