<?php

namespace App\Http\Controllers;

use App\Country;
use App\Heritage;
use App\CollectCountry;
use App\CollectHeritage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CollectController extends Controller
{
    // コレクト登録(国)
    public function collect_country(Country $country) {
        if (CollectCountry::where([['user_id', '=', Auth::id()], ['country_id', '=', $country->id]])->exists()) {
            $collect = CollectCountry::where([['user_id', '=', Auth::id()], ['country_id', '=', $country->id]])->first();
        } else {
            $collect = new CollectCountry;
            $collect->country_id = $country->id;
            $collect->user_id = Auth::id();
        }
        $collect->collected = true;
        $collect->save();
        $message = "コレクト登録されました！";
        $collect_count = $country->getCollectCount();
        
        return response()->json(compact('message', 'collect_count'));
    }

    // コレクト解除(国)
    public function uncollect_country(Country $country) {
        $collect = CollectCountry::where([['user_id', '=', Auth::id()], ['country_id', '=', $country->id]])->first();
        $collect->collected = false;
        $collect->save();
        $message = "コレクトが解除されました！";
        $collect_count = $country->getCollectCount();
        
        return response()->json(compact('message', 'collect_count'));
    }
    
    // コレクト登録(世界遺産)
    public function collect_heritage(Heritage $heritage) {
        if (CollectHeritage::where([['user_id', '=', Auth::id()], ['heritage_id', '=', $heritage->id]])->exists()) {
            $collect = CollectHeritage::where([['user_id', '=', Auth::id()], ['heritage_id', '=', $heritage->id]])->first();
        } else {
            $collect = new CollectHeritage;
            $collect->heritage_id = $heritage->id;
            $collect->user_id = Auth::id();
        }
        $collect->collected = true;
        $collect->save();
        $message = "コレクト登録されました！";
        $collect_count = $heritage->getCollectCount();
        
        return response()->json(compact('message', 'collect_count'));
    }

    // コレクト解除(世界遺産)
    public function uncollect_heritage(Heritage $heritage) {
        $collect = CollectHeritage::where([['user_id', '=', Auth::id()], ['heritage_id', '=', $heritage->id]])->first();
        $collect->collected = false;
        $collect->save();
        $message = "コレクトが解除されました！";
        $collect_count = $heritage->getCollectCount();
        
        return response()->json(compact('message', 'collect_count'));
    }
}
