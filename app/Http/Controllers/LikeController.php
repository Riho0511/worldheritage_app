<?php

namespace App\Http\Controllers;

use App\Country;
use App\Heritage;
use App\LikeCountry;
use App\LikeHeritage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    // お気に入り登録(国)
    public function like_country(Country $country) {
        if (LikeCountry::where([['user_id', '=', Auth::id()], ['country_id', '=', $country->id]])->exists()) {
            $like = LikeCountry::where([['user_id', '=', Auth::id()], ['country_id', '=', $country->id]])->first();
        } else {
            $like = new LikeCountry;
            $like->country_id = $country->id;
            $like->user_id = Auth::id();
        }
        $like->liked = true;
        $like->save();
        $message = "お気に入り登録されました！";
        $like_count = $country->getLikeCount();
        
        return response()->json(compact('message', 'like_count'));
    }

    // お気に入り解除(国)
    public function unlike_country(Country $country) {
        $like = LikeCountry::where([['user_id', '=', Auth::id()], ['country_id', '=', $country->id]])->first();
        $like->liked = false;
        $like->save();
        $message = "お気に入りが解除されました！";
        $like_count = $country->getLikeCount();
        
        return response()->json(compact('message', 'like_count'));
    }
    
    // お気に入り登録(世界遺産)
    public function like_heritage(Heritage $heritage) {
        if (LikeHeritage::where([['user_id', '=', Auth::id()], ['heritage_id', '=', $heritage->id]])->exists()) {
            $like = LikeHeritage::where([['user_id', '=', Auth::id()], ['heritage_id', '=', $heritage->id]])->first();
        } else {
            $like = new LikeHeritage;
            $like->heritage_id = $heritage->id;
            $like->user_id = Auth::id();
        }
        $like->liked = true;
        $like->save();
        $message = "お気に入り登録されました！";
        $like_count = $heritage->getLikeCount();
        
        return response()->json(compact('message', 'like_count'));
    }

    // お気に入り解除(世界遺産)
    public function unlike_heritage(Heritage $heritage) {
        $like = LikeHeritage::where([['user_id', '=', Auth::id()], ['heritage_id', '=', $heritage->id]])->first();
        $like->liked = false;
        $like->save();
        $message = "お気に入りが解除されました！";
        $like_count = $heritage->getLikeCount();
        
        return response()->json(compact('message', 'like_count'));
    }
}
