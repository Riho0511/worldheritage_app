<?php

namespace App\Http\Controllers;

use App\User;
use App\Country;
use App\Heritage;
use App\Nice;
use App\Collect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserController extends Controller
{
    // マイページ
    public function mypage() {
        if (Auth::check()) {
            $auth = Auth::id();
        } else {
            $auth = null;
        }
        $user = new User;
        $userInfo = $user->where('id', $authId)->first();
        $return_info = ['user' => $userInfo];
        
        return response()->json($return_info);
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
        
        $return_info = ['niceCountries' => $niceCountries, 'niceHeritages' => $niceHeritages, 'collectCountries' => $collectCountries, 'collectHeritages' => $collectHeritages, 'auth' => $auth];
        
        return response()->json($return_info);
    }
}
