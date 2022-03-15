<?php

namespace App\Http\Controllers;

use App\User;
use App\Image;
use App\Comment;
use App\LikeCountry;
use App\LikeHeritage;
use App\CollectCountry;
use App\CollectHeritage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // マイページ
    public function mypage() {
        $comment_table = new Comment;
        $user_table = new User;
        $user = Auth::user();
        // お気に入りしている国
        $like_countries = $user_table->getInfo(User::where('id', Auth::id())->first(), 'country', 'like');
        // お気に入りしている世界遺産
        $like_heritages = $user_table->getInfo(User::where('id', Auth::id())->first(), 'heritage', 'like');
        // コレクトしている国
        $collect_countries = $user_table->getInfo(User::where('id', Auth::id())->first(), 'country', 'collect');
        // コレクトしている世界遺産
        $collect_heritages = $user_table->getInfo(User::where('id', Auth::id())->first(), 'heritage', 'collect');
        // 投稿した画像
        $images = Image::where('user_id', Auth::id())->get();
        // 投稿したコメント
        $comments = $comment_table->setComments(Auth::id(), 5000, "mypage");

        return response()->json(compact('user', 'like_countries', 'like_heritages', 'collect_countries', 'collect_heritages', 'images', 'comments'));
    }
    
    // マイページ編集
    public function edit() {
        $user = Auth::user();

        return response()->json(compact('user'));
    }
    
    // ユーザー情報更新
    public function update(Request $request, User $user) {
        $check_image = $request['image_update'];
        $check_password = $request['password_update'];
        
        // アイコン変更
        if ($check_image == "T") {
            $image = $request->file('image');
            Storage::disk('s3')->delete($user->image);
            $path = Storage::disk('s3')->putFile('user', $image, 'public');
            $user->image = $path;
        }
        
        // パスワード変更
        if ($check_password == "T") {
            $user->password = bcrypt($request['password']);
        }
        
        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->save();
        return response()->json("ユーザー情報が更新されました！");
    }
    
    // ユーザー削除
    public function delete() {
        LikeCountry::where('user_id', Auth::id())->delete();
        LikeHeritage::where('user_id', Auth::id())->delete();
        CollectCountry::where('user_id', Auth::id())->delete();
        CollectHeritage::where('user_id', Auth::id())->delete();
        Comment::where('user_id', Auth::id())->delete();
        Storage::disk('s3')->delete(Auth::user()->image);
        Auth::user()->delete();
    }
    
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
