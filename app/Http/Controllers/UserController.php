<?php

namespace App\Http\Controllers;

use App\User;
use App\Image;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // ユーザー情報取得
    public function user() {
        $user = Auth::user();
        return response()->json($user);
    }
    
    // マイページ
    public function mypage() {
        $comment_table = new Comment;
        $user_table = new User;
        // お気に入りしている国
        // $like_countries = Auth::user()->like_countries()->get();
        $like_countries = $user_table->getInfo(User::where('id', Auth::id())->first(), 'country', 'like');
        // お気に入りしている世界遺産
        // $like_heritages = Auth::user()->like_heritages()->get();
        $like_heritages = $user_table->getInfo(User::where('id', Auth::id())->first(), 'heritage', 'like');
        // コレクトしている国
        // $collect_countries = Auth::user()->collect_countries()->get();
        $collect_countries = $user_table->getInfo(User::where('id', Auth::id())->first(), 'country', 'collect');
        // コレクトしている世界遺産
        // $collect_heritages = Auth::user()->collect_heritages()->get();
        $collect_heritages = $user_table->getInfo(User::where('id', Auth::id())->first(), 'heritage', 'collect');
        // 投稿した画像
        $images = Image::where('user_id', Auth::id())->get();
        // 投稿したコメント
        $comments = $comment_table->setComments(Auth::id(), 5000, "mypage");

        return response()->json(compact('like_countries', 'like_heritages', 'collect_countries', 'collect_heritages', 'images', 'comments'));
    }
    
    // // ユーザー情報編集
    // public function edit(User $user) {
    //     $auth = Auth::id();
    //     $user_info = $user->where('id', $auth)->first();
        
    //     $return_info = ['user' => $user_info];
    //     return response()->json($return_info);
    // }
    
    // // ユーザー情報更新
    // public function update(Request $request, User $user) {
    //     $check_image = $request['image_update'];
    //     $check_password = $request['password_update'];
        
    //     if ($check_image == "T") {
    //         $image = $request->file('image');
    //         Storage::disk('s3')->delete($user->image);
    //         $path = Storage::disk('s3')->putFile('user', $image, 'public');
    //     }
        
    //     $user_info['name'] = $request['name'];
    //     if (isset($path)) {
    //         $user_info['image'] = $path;
    //     }
    //     $user_info['email'] = $request['email'];
    //     if ($check_password == "T") {
    //         $user_info['password'] = bcrypt($request['password']);
    //     }
    //     $user->fill($user_info)->save();
    //     return response()->json("ユーザー情報が更新されました！");
    // }
    
    // // ランキング
    // public function ranking(Country $country, Heritage $heritage, Nice $nice, Collect $collect) {
    //     if (Auth::check()) {
    //         $auth = Auth::id();
    //     } else {
    //         $auth = null;
    //     }
    //     $niceCountries = $nice->whereNotNull('country_id')->select(DB::raw('count(*) as cnt, country_id'))->groupBy('country_id')->orderBy('cnt', 'desc')->limit(3)->get();
    //     $niceHeritages = $nice->whereNotNull('heritage_id')->select(DB::raw('count(*) as cnt, heritage_id'))->groupBy('heritage_id')->orderBy('cnt', 'desc')->limit(3)->get();
    //     $collectCountries = $collect->whereNotNull('country_id')->select(DB::raw('count(*) as cnt, country_id'))->groupBy('country_id')->orderBy('cnt', 'desc')->limit(3)->get();
    //     $collectHeritages = $collect->whereNotNull('heritage_id')->select(DB::raw('count(*) as cnt, heritage_id'))->groupBy('heritage_id')->orderBy('cnt', 'desc')->limit(3)->get();
        
    //     // お気に入りベスト3(国)
    //     foreach ($niceCountries as $nc) {
    //         $nc->name = $country->where('id', $nc->country_id)->first()->name;
    //     }
        
    //     // お気に入りベスト3(世界遺産)
    //     foreach ($niceHeritages as $nh) {
    //         $nh->name = $heritage->where('id', $nh->heritage_id)->first()->name;
    //     }
        
    //     // 行った国ベスト3
    //     foreach ($collectCountries as $cc) {
    //         $cc->name = $country->where('id', $cc->country_id)->first()->name;
    //     }
        
    //     // 行った世界遺産ベスト3
    //     foreach ($collectHeritages as $ch) {
    //         $ch->name = $heritage->where('id', $ch->heritage_id)->first()->name;
    //     }
        
    //     $return_info = [
    //         'niceCountries' => $niceCountries, 
    //         'niceHeritages' => $niceHeritages, 
    //         'collectCountries' => $collectCountries, 
    //         'collectHeritages' => $collectHeritages, 
    //         'auth' => $auth
    //     ];
        
    //     return response()->json($return_info);
    // }
}
