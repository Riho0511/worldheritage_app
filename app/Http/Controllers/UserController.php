<?php

namespace App\Http\Controllers;

use App\User;
use App\Country;
use App\Heritage;
use App\Image;
use App\Nice;
use App\Collect;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserController extends Controller
{
    // マイページ
    public function mypage(User $user, Country $country, Heritage $heritage, Image $image, Comment $comment, Nice $nice, Collect $collect) {
        if (Auth::check()) {
            $auth = Auth::id();
        } else {
            $auth = null;
        }
        $userInfo = $user->where('id', $auth)->first();
        $comments = $comment->where('user_id', $auth)->get();
        $comments_heritage = [];
        foreach($comments as $com) {
            array_push($comments_heritage, $heritage->where('id', $com->heritage_id)->first()->name);
        }
        $collectCountries = $collect->whereNotNull('country_id')->where('user_id', $auth)->get();
        $collectHeritages = $collect->whereNotNull('heritage_id')->where('user_id', $auth)->get();
        $niceCountries = $nice->whereNotNull('country_id')->where('user_id', $auth)->get();
        $niceHeritages = $nice->whereNotNull('heritage_id')->where('user_id', $auth)->get();
        $images = $image->where('user_id', $auth)->get();
        
        $cc = [];
        foreach($collectCountries as $c) {
            array_push($cc, $country->where('id', $c->country_id)->first()->name);
        }
        $ch = [];
        foreach($collectHeritages as $h) {
            array_push($ch, $heritage->where('id', $h->heritage_id)->first()->name);
        }
        $nc = [];
        foreach($niceCountries as $c) {
            array_push($nc, $country->where('id', $c->country_id)->first()->name);
        }
        $nh = [];
        foreach($niceHeritages as $h) {
            array_push($nh, $heritage->where('id', $h->heritage_id)->first()->name);
        }
        
        $return_info = [
            'user' => $userInfo, 
            'comments' => $comments, 
            'commentsHeritages' => $comments_heritage, 
            'images' => $images, 
            'collectCountries' => $cc, 
            'collectHeritages' => $ch, 
            'niceCountries' => $nc, 
            'niceHeritages' => $nh
        ];
        return response()->json($return_info);
    }
    
    // ユーザー情報編集
    public function edit(User $user) {
        $auth = Auth::id();
        $user_info = $user->where('id', $auth)->first();
        
        $return_info = ['user' => $user_info];
        return response()->json($return_info);
    }
    
    // ユーザー情報更新
    public function update(Request $request, User $user) {
        $check_image = $request['image_update'];
        $check_password = $request['password_update'];
        
        if ($check_image == "T") {
            $image = $request->file('image');
            Storage::disk('s3')->delete($user->image);
            $path = Storage::disk('s3')->putFile('user', $image, 'public');
        }
        
        $user_info['name'] = $request['name'];
        if (isset($path)) {
            $user_info['image'] = $path;
        }
        $user_info['email'] = $request['email'];
        if ($check_password == "T") {
            $user_info['password'] = bcrypt($request['password']);
        }
        $user->fill($user_info)->save();
        return response()->json("ユーザー情報が更新されました！");
    }
    
    // ランキング
    public function ranking(Country $country, Heritage $heritage, Nice $nice, Collect $collect) {
        if (Auth::check()) {
            $auth = Auth::id();
        } else {
            $auth = null;
        }
        $niceCountries = $nice->whereNotNull('country_id')->select(DB::raw('count(*) as cnt, country_id'))->groupBy('country_id')->orderBy('cnt', 'desc')->limit(3)->get();
        $niceHeritages = $nice->whereNotNull('heritage_id')->select(DB::raw('count(*) as cnt, heritage_id'))->groupBy('heritage_id')->orderBy('cnt', 'desc')->limit(3)->get();
        $collectCountries = $collect->whereNotNull('country_id')->select(DB::raw('count(*) as cnt, country_id'))->groupBy('country_id')->orderBy('cnt', 'desc')->limit(3)->get();
        $collectHeritages = $collect->whereNotNull('heritage_id')->select(DB::raw('count(*) as cnt, heritage_id'))->groupBy('heritage_id')->orderBy('cnt', 'desc')->limit(3)->get();
        
        // お気に入りベスト3(国)
        foreach ($niceCountries as $nc) {
            $nc->name = $country->where('id', $nc->country_id)->first()->name;
        }
        
        // お気に入りベスト3(世界遺産)
        foreach ($niceHeritages as $nh) {
            $nh->name = $heritage->where('id', $nh->heritage_id)->first()->name;
        }
        
        // 行った国ベスト3
        foreach ($collectCountries as $cc) {
            $cc->name = $country->where('id', $cc->country_id)->first()->name;
        }
        
        // 行った世界遺産ベスト3
        foreach ($collectHeritages as $ch) {
            $ch->name = $heritage->where('id', $ch->heritage_id)->first()->name;
        }
        
        $return_info = [
            'niceCountries' => $niceCountries, 
            'niceHeritages' => $niceHeritages, 
            'collectCountries' => $collectCountries, 
            'collectHeritages' => $collectHeritages, 
            'auth' => $auth
        ];
        
        return response()->json($return_info);
    }
}
