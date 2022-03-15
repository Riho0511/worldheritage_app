<?php

namespace App\Http\Controllers;

use App\User;
use App\Country;
use App\Heritage;
use App\Image;
use LikeCountry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CountryController extends Controller
{
    // 国情報画面
    public function show(Country $country) {
        $user = Auth::user();
        $heritage_table = new Heritage;
        // 世界遺産情報
        $heritages = $country->heritages()->get();
        $images = Image::get();
        $country_heritages = [];
        foreach($heritages as $heritage) {
            foreach($images as $image) {
                if ($heritage->id == $image->heritage_id) {
                    $h_collected = empty($heritage->collect_users);
                    array_push($country_heritages, ['heritage' => $heritage, 'heritage_images' => $image, 'collected' => $h_collected]);
                    break;
                }
            }
        }
        // 国の通貨
        $currencies = $country->currencies()->get();
        // お気に入りしているか, コレクトしているかどうかを取得（国と世界遺産）
        if (Auth::check()) {
            $country_liked = $country->isLiked(User::where('id', Auth::id())->first());
            $country_collected = $country->isCollected(User::where('id', Auth::id())->first());
            $heritage_liked = $heritage_table->isCheck('like_users', Auth::id(), $country->id);
            $heritage_collected = $heritage_table->isCheck('collect_users', Auth::id(), $country->id);
        } else {
            $country_liked = false;
            $country_collected = false;
            $heritage_liked = [];
            $heritage_collected = [];
        }
        // お気に入り総数取得（国）
        $like_count = $country->getLikeCount();
        // コレクト総数取得（国）
        $collect_count = $country->getCollectCount();
        return response()->json(
            compact('user', 'country', 'country_heritages', 'currencies', 'country_liked', 'country_collected', 
                    'heritage_liked', 'heritage_collected', 'like_count', 'collect_count'));
    }
    
    
    
    // // 国追加画面
    // public function countryCreate(Currency $currency) {
    //     $currencies = $currency->get();
        
    //     $return_info = ['currencies' => $currencies];
    //     return response()->json($return_info);
    // }
    
    // // 世界遺産追加画面
    // public function heritageCreate(Country $country) {
    //     $currency = $country->currencies()->first();
    //     return response()->json($currency);
    // }
    

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
        
    //     // 既に存在している通貨から選択したものを登録
    //     if (!empty($exist_currencies)) {
    //         $return = array();
    //         $word_array = array(',', '、', ' ', '　');
    //         $array = array($exist_currencies);
    //         foreach ($word_array as $value1){
    //             foreach ($array as $key => $value2) {
    //                 $return = array_merge($return, explode($value1, $value2));
    //                 if(count($array) - 1 === $key) {
    //                     $array = $return;
    //                     $return = array();
    //                 }
    //             }
    //         }
    //         foreach($array as $new) {
    //             if ($new == null) {
    //                 continue;
    //             }
    //             $currency = new Currency;
    //             $curId = $currency->where('unit', $new)->first()->id;
    //             $country->currencies()->attach(
    //                 ['country_id' => $country->id],
    //                 ['currency_id' => $curId],
    //                 ['created_at' => $now],
    //                 ['updated_at' => $now]
    //             );
    //         }
    //     }
        
    //     // 新しく通貨を登録
    //     if (!empty($new_currencies)) {
    //         $return = array();
    //         $word_array = array(',', '、', ' ', '　');
    //         $array = array($new_currencies);
    //         foreach ($word_array as $value1){
    //             foreach ($array as $key => $value2) {
    //                 $return = array_merge($return, explode($value1, $value2));
    //                 if(count($array) - 1 === $key) {
    //                     $array = $return;
    //                     $return = array();
    //                 }
    //             }
    //         }
    //         foreach($array as $new) {
    //             if ($new == null) {
    //                 continue;
    //             }
    //             $currency = new Currency;
    //             $add_currency = [];
    //             $add_currency['unit'] = $new;
    //             $add_currency['created_at'] = $now;
    //             $add_currency['updated_at'] = $now;
    //             $currency->fill($add_currency)->save();
    //             $country->currencies()->attach(
    //                 ['country_id' => $country->id],
    //                 ['currency_id' => $currency->id],
    //                 ['created_at' => $now],
    //                 ['updated_at' => $now]
    //             );
    //         }
    //     }
        
    //     $return_info = ['newId' => $country->id, 'message' => "国が追加されました！"];
    //     return response()->json($return_info);
    // }
    
    // // 国編集画面
    // public function countryEdit(Country $country, Currency $currency) {
    //     $currencies_list = $currency->get();
    //     $current_currencies = $country->currencies()->get();
    //     $return_info = ['country' => $country, 'currenciesList' => $currencies_list, 'currentCurrencies' => $current_currencies];
        
    //     return response()->json($return_info); 
    // }
    
    // // 世界遺産編集画面
    // public function heritageEdit(Country $country, Heritage $heritage, Image $image) {
    //     $currency = $country->currencies()->first();
    //     $images = $image->where('heritage_id', $heritage->id)->get();
    //     $return_info = ['heritage' => $heritage, 'currency' => $currency, 'images' => $images];
        
    //     return response()->json($return_info);
    // }
    
    // // 国情報アップデート
    // public function update(Request $request, Country $country) {
    //     $now = Carbon::now();
    //     $input = $request['data'];
    //     $country_info['name'] = $input['name'];
    //     $country_info['official_name'] = $input['official_name'];
    //     $country_info['capital'] = $input['capital'];
    //     $country_info['time_difference'] = $input['time_difference'];
    //     $country_info['plane_movement'] = $input['plane_movement'];
    //     $country_info['state'] = $input['state'];
    //     $exist_currencies = $input['currencies'];
    //     $new_currencies = $input['new_currencies'];
    //     $country->fill($country_info)->save();
        
    //     // 既に存在している通貨から選択したものを登録
    //     $all_id = [];
    //     if (!empty($exist_currencies)) {
    //         foreach($exist_currencies as $exist) {
    //             $currency = new Currency;
    //             $curId = $currency->where('unit', $exist)->first()->id;
    //             array_push($all_id, $curId);
    //             if(!next($all_id)){ 
    //                 $country->currencies()->sync($all_id);
	   //         }
    //         }
    //     } else {
    //         $country->currencies()->sync($all_id);
    //     }
        
    //     // 新しく通貨を登録
    //     if (!empty($new_currencies)) {
    //         $return = array();
    //         $word_array = array(',', '、', ' ', '　');
    //         $array = array($new_currencies);
    //         foreach ($word_array as $value1){
    //             foreach ($array as $key => $value2) {
    //                 $return = array_merge($return, explode($value1, $value2));
    //                 if(count($array) - 1 === $key) {
    //                     $array = $return;
    //                     $return = array();
    //                 }
    //             }
    //         }
    //         foreach($array as $new) {
    //             if ($new == null) {
    //                 continue;
    //             }
    //             $currency = new Currency;
    //             $add_currency = [];
    //             $add_currency['unit'] = $new;
    //             $add_currency['created_at'] = $now;
    //             $add_currency['updated_at'] = $now;
    //             $currency->fill($add_currency)->save();
    //             $country->currencies()->attach(
    //                 ['country_id' => $country->id],
    //                 ['currency_id' => $currency->id],
    //                 ['created_at' => $now],
    //                 ['updated_at' => $now]
    //             );
    //         }
    //     }
        
    //     $return_info = ['message' => '国情報が更新されました！'];
    //     return response()->json($return_info);
    // }
    
    // // 国削除
    // public function delete(Country $country, Heritage $heritage, Image $image) {
    //     $delete_heritages = $heritage->where('country_id', $country->id)->get();
    //     foreach ($delete_heritages as $del_heritage) {
    //         $heritage_images = $image->where('heritage_id', $del_heritage->id)->get();
            
    //         // 画像削除
    //         foreach ($heritage_images as $heritage_image) {
    //             Storage::disk('s3')->delete($heritage_image->image);
    //             $image->where('id', $heritage_image->id)->delete();
    //         }
    //         // 世界遺産削除
    //         $heritage->where('id', $del_heritage->id)->delete();
    //     }
    //     // 該当する通貨削除
    //     $country->currencies()->detach();
        
    //     // 国削除
    //     $country->delete();
        
    //     return response()->json("国が削除されました！");
    // }
}
