<?php

namespace App\Http\Controllers;

use App\Country;
use App\Heritage;
use App\User;
use App\Collect;
use Illuminate\Http\Request;

class CollectController extends Controller
{
    // 行ったことがある(国)
    public function collectCountry(Country $country, User $user) {
        $collect = new Collect;
        $collect->country_id = $country->id;
        $collect->heritage_id = null;
        $collect->user_id = $user->id;
        $collect->save();
        
        return response()->json("コレクト登録されました！");
    }

    // 行ったことがない(国)
    public function nocollectCountry(Country $country, User $user, Collect $collect) {
        $collect->where('country_id', $country->id)->where('user_id', $user->id)->delete();
        return response()->json("コレクト登録が解除されました！");
    }
    
    // 行ったことがある(世界遺産)
    public function collectHeritage(Heritage $heritage, User $user) {
        $collect = new Collect;
        $collect->country_id = null;
        $collect->heritage_id = $heritage->id;
        $collect->user_id = $user->id;
        $collect->save();
        
        return response()->json("コレクト登録されました！");
    }

    // 行ったことがない(世界遺産)
    public function nocollectHeritage(Heritage $heritage, User $user, Collect $collect) {
        $collect->where('heritage_id', $heritage->id)->where('user_id', $user->id)->delete();
        return response()->json("コレクト登録が解除されました！");
    }
}
