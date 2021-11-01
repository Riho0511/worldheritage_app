<?php

namespace App\Http\Controllers;

use App\User;
use App\Country;
use App\Heritage;
use App\Currency;
use App\Image;
use App\Nice;
use App\Collect;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CountryController extends Controller
{
    // ホーム画面
    public function index() {
        if (Auth::check()) {
            $auth = Auth::id();
        } else {
            $auth = null;
        }
        
        $return_info = ['auth' => $auth];
        return response()->json($return_info);
    }
    
    // 州別国一覧画面
    public function state($state, Country $country, Collect $collect) {
        if (Auth::check()) {
            $auth = Auth::id();
        } else {
            $auth = null;
        }
        $countries = $country->where('state', $state)->get();
        $collects = $collect->whereNotNull('country_id')->where('user_id', $auth)->get();
        $collected = [];
        foreach($collects as $c) {
            array_push($collected, $c->country_id);
        }
        $return_info = ['auth' => $auth, 'collected' => $collected, 'countries' => $countries];
        
        return response()->json($return_info);
    }
    
    // 国追加画面
    public function countryCreate(Currency $currency) {
        $currencies = $currency->get();
        
        $return_info = ['currencies' => $currencies];
        return response()->json($return_info);
    }
    
    // 世界遺産追加画面
    public function heritageCreate(Country $country) {
        $currency = $country->currencies()->first();
        return response()->json($currency);
    }
    
    // 国情報画面
    public function country(Country $country, Image $image, Nice $nice, Collect $collect) {
        $heritages = $country->heritages()->get();
        $currencies = $country->currencies()->get();
        $images = [];
        foreach ($heritages as $heritage) {
            array_push($images, $image->where('heritage_id', $heritage->id)->first());
        }
        if (Auth::check()) {
            $auth = Auth::id();
        } else {
            $auth = null;
        }
        $niced = $nice->where('country_id', $country->id)->where('user_id', $auth)->first();
        $collected = $collect->where('country_id', $country->id)->where('user_id', $auth)->first();
        $col = $collect->whereNotNull('heritage_id')->where('user_id', $auth)->get();
        $heritageCollected = [];
        foreach($col as $c) {
            array_push($heritageCollected, $c->heritage_id);
        }
        $niceCount = $nice->where('country_id', $country->id)->count();
        $collectCount = $collect->where('country_id', $country->id)->count();
        
        $return_info = [
            'country' => $country, 
            'heritages' => $heritages, 
            'currencies' => $currencies, 
            'images' => $images, 
            'auth' => $auth, 
            'niced' => $niced, 
            'collected' => $collected, 
            'heritageCollected' => $heritageCollected,
            'niceCount' => $niceCount,
            'collectCount' => $collectCount,
        ];
        return response()->json($return_info);
    }
    
    // 世界遺産情報画面
    public function heritage(Country $country, Heritage $heritage, Image $image, Nice $nice, Collect $collect, Comment $comment) {
        $currency = $country->currencies()->first();
        $images = $image->where('heritage_id', $heritage->id)->get();
        if (Auth::check()) {
            $auth = Auth::id();
        } else {
            $auth = null;
        }
        $niced = $nice->where('heritage_id', $country->id)->where('user_id', $auth)->first();
        $collected = $collect->where('heritage_id', $country->id)->where('user_id', $auth)->first();
        $comments = $comment->where('heritage_id', $heritage->id)->orderBy('created_at', 'desc')->get();
        $comments_username = [];
        $comments_avatar = [];
        foreach($comments as $comment) {
            $user = new User;
            $array1 = $user->where('id', $comment->user_id)->first()->name;
            $array2 = $user->where('id', $comment->user_id)->first()->image;
            array_push($comments_username, $array1);
            array_push($comments_avatar, $array2);
        }
        $niceCount = $nice->where('heritage_id', $heritage->id)->count();
        $collectCount = $collect->where('heritage_id', $heritage->id)->count();
        $return_info = [
            'country' => $country, 
            'heritage' => $heritage, 
            'currency' => $currency, 
            'images' => $images, 
            'state' => $country->state, 
            'auth' => $auth, 
            'niced' => $niced, 
            'collected' => $collected, 
            'comments' => $comments,
            'commentsUsername' => $comments_username,
            'commentsAvatar' => $comments_avatar,
            'niceCount' => $niceCount,
            'collectCount' => $collectCount,
        ];
        
        return response()->json($return_info);
    }
    
    // 国保存
    public function store(Request $request, Country $country) {
        $now = Carbon::now();
        $country_info['name'] = $request['name'];
        $country_info['official_name'] = $request['official_name'];
        $country_info['capital'] = $request['capital'];
        $country_info['time_difference'] = $request['time_difference'];
        $country_info['plane_movement'] = $request['plane_movement'];
        $country_info['state'] = $request['state'];
        $exist_currencies = $request['currencies'];
        $new_currencies = $request['new_currencies'];
        $country->fill($country_info)->save();
        
        // 既に存在している通貨から選択したものを登録
        if (!empty($exist_currencies)) {
            $return = array();
            $word_array = array(',', '、', ' ', '　');
            $array = array($exist_currencies);
            foreach ($word_array as $value1){
                foreach ($array as $key => $value2) {
                    $return = array_merge($return, explode($value1, $value2));
                    if(count($array) - 1 === $key) {
                        $array = $return;
                        $return = array();
                    }
                }
            }
            foreach($array as $new) {
                if ($new == null) {
                    continue;
                }
                $currency = new Currency;
                $curId = $currency->where('unit', $new)->first()->id;
                $country->currencies()->attach(
                    ['country_id' => $country->id],
                    ['currency_id' => $curId],
                    ['created_at' => $now],
                    ['updated_at' => $now]
                );
            }
        }
        
        // 新しく通貨を登録
        if (!empty($new_currencies)) {
            $return = array();
            $word_array = array(',', '、', ' ', '　');
            $array = array($new_currencies);
            foreach ($word_array as $value1){
                foreach ($array as $key => $value2) {
                    $return = array_merge($return, explode($value1, $value2));
                    if(count($array) - 1 === $key) {
                        $array = $return;
                        $return = array();
                    }
                }
            }
            foreach($array as $new) {
                if ($new == null) {
                    continue;
                }
                $currency = new Currency;
                $add_currency = [];
                $add_currency['unit'] = $new;
                $add_currency['created_at'] = $now;
                $add_currency['updated_at'] = $now;
                $currency->fill($add_currency)->save();
                $country->currencies()->attach(
                    ['country_id' => $country->id],
                    ['currency_id' => $currency->id],
                    ['created_at' => $now],
                    ['updated_at' => $now]
                );
            }
        }
        
        $return_info = ['newId' => $country->id, 'message' => "国が追加されました！"];
        return response()->json($return_info);
    }
    
    // 国編集画面
    public function countryEdit(Country $country, Currency $currency) {
        $currencies_list = $currency->get();
        $current_currencies = $country->currencies()->get();
        $return_info = ['country' => $country, 'currenciesList' => $currencies_list, 'currentCurrencies' => $current_currencies];
        
        return response()->json($return_info); 
    }
    
    // 世界遺産編集画面
    public function heritageEdit(Country $country, Heritage $heritage, Image $image) {
        $currency = $country->currencies()->first();
        $images = $image->where('heritage_id', $heritage->id)->get();
        $return_info = ['heritage' => $heritage, 'currency' => $currency, 'images' => $images];
        
        return response()->json($return_info);
    }
    
    // 国情報アップデート
    public function update(Request $request, Country $country) {
        $now = Carbon::now();
        $input = $request['data'];
        $country_info['name'] = $input['name'];
        $country_info['official_name'] = $input['official_name'];
        $country_info['capital'] = $input['capital'];
        $country_info['time_difference'] = $input['time_difference'];
        $country_info['plane_movement'] = $input['plane_movement'];
        $country_info['state'] = $input['state'];
        $exist_currencies = $input['currencies'];
        $new_currencies = $input['new_currencies'];
        $country->fill($country_info)->save();
        
        // 既に存在している通貨から選択したものを登録
        $all_id = [];
        if (!empty($exist_currencies)) {
            foreach($exist_currencies as $exist) {
                $currency = new Currency;
                $curId = $currency->where('unit', $exist)->first()->id;
                array_push($all_id, $curId);
                if(!next($all_id)){ 
                    $country->currencies()->sync($all_id);
	            }
            }
        } else {
            $country->currencies()->sync($all_id);
        }
        
        // 新しく通貨を登録
        if (!empty($new_currencies)) {
            $return = array();
            $word_array = array(',', '、', ' ', '　');
            $array = array($new_currencies);
            foreach ($word_array as $value1){
                foreach ($array as $key => $value2) {
                    $return = array_merge($return, explode($value1, $value2));
                    if(count($array) - 1 === $key) {
                        $array = $return;
                        $return = array();
                    }
                }
            }
            foreach($array as $new) {
                if ($new == null) {
                    continue;
                }
                $currency = new Currency;
                $add_currency = [];
                $add_currency['unit'] = $new;
                $add_currency['created_at'] = $now;
                $add_currency['updated_at'] = $now;
                $currency->fill($add_currency)->save();
                $country->currencies()->attach(
                    ['country_id' => $country->id],
                    ['currency_id' => $currency->id],
                    ['created_at' => $now],
                    ['updated_at' => $now]
                );
            }
        }
        
        $return_info = ['message' => '国情報が更新されました！'];
        return response()->json($return_info);
    }
    
    // 国削除
    public function delete(Country $country, Heritage $heritage, Image $image) {
        $delete_heritages = $heritage->where('country_id', $country->id)->get();
        foreach ($delete_heritages as $del_heritage) {
            $heritage_images = $image->where('heritage_id', $del_heritage->id)->get();
            
            // 画像削除
            foreach ($heritage_images as $heritage_image) {
                Storage::disk('s3')->delete($heritage_image->image);
                $image->where('id', $heritage_image->id)->delete();
            }
            // 世界遺産削除
            $heritage->where('id', $del_heritage->id)->delete();
        }
        // 該当する通貨削除
        $country->currencies()->detach();
        
        // 国削除
        $country->delete();
        
        return response()->json("国が削除されました！");
    }
}
