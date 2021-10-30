<?php

namespace App\Http\Controllers;

use App\Country;
use App\Heritage;
use App\User;
use App\Nice;
use Illuminate\Http\Request;

class NiceController extends Controller
{
    // お気に入り登録(国)
    public function niceCountry(Country $country, User $user) {
        $nice = new Nice;
        $nice->country_id = $country->id;
        $nice->heritage_id = null;
        $nice->user_id = $user->id;
        $nice->save();
        
        return response()->json("お気に入り登録されました！");
    }

    // お気に入り解除(国)
    public function unniceCountry(Country $country, User $user, Nice $nice) {
        $nice->where('country_id', $country->id)->where('user_id', $user->id)->delete();
        return response()->json("お気に入りが解除されました！");
    }
    
    // お気に入り登録(世界遺産)
    public function niceHeritage(Heritage $heritage, User $user) {
        $nice = new Nice;
        $nice->country_id = null;
        $nice->heritage_id = $heritage->id;
        $nice->user_id = $user->id;
        $nice->save();
        
        return response()->json("お気に入り登録されました！");
    }

    // お気に入り解除(世界遺産)
    public function unniceHeritage(Heritage $heritage, User $user, Nice $nice) {
        $nice->where('heritage_id', $heritage->id)->where('user_id', $user->id)->delete();
        return response()->json("お気に入りが解除されました！");
    }
}
