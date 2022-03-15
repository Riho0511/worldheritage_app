<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Country;
use App\Heritage;
use App\Image;
use App\Comment;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class HeritageController extends Controller
{
    // 世界遺産情報画面
    public function show(Country $country, Heritage $heritage) {
        $user = Auth::user();
        $comment_table = new Comment;
        // 世界遺産の属する国の通貨
        $currency = $country->currencies()->first();
        // 世界遺産画像
        $images = Image::where('heritage_id', $heritage->id)->get();
        // お気に入りしているか, コレクトしているかどうかを取得
        if (Auth::check()) {
            $liked = $heritage->isLiked(User::where('id', Auth::id())->first());
            $collected = $heritage->isCollected(User::where('id', Auth::id())->first());
        } else {
            $liked = false;
            $collected = false;
        }
        // コメント（2つ）
        $comments_info = $comment_table->setComments($heritage->id, 2, "");
        // コメントの総数取得
        $comment_count = $heritage->comments()->count();
        // お気に入り総数取得（世界遺産）
        $like_count = $heritage->getLikeCount();
        // コレクト総数取得（世界遺産）
        $collect_count = $heritage->getCollectCount();
        
        return response()->json(
            compact('user', 'country', 'heritage', 'currency', 'images', 'liked', 'collected', 
                    'comments_info', 'like_count', 'collect_count', 'comment_count'));
    }
    
    
    // 世界遺産保存
    public function store(Request $request, Heritage $heritage) {
        $auth = Auth::id();
        $heritage_info['country_id'] = $request['country_id'];
        $heritage_info['name'] = $request['name'];
        $heritage_info['entrance_fee'] = $request['entrance_fee'];
        $heritage->fill($heritage_info)->save();
        
        // 画像保存
        $heritage_images = $request->file('images');
        foreach($heritage_images as $heritage_image) {
            $add_image = [];
            $image = new Image;
            $path = Storage::disk('s3')->putFile('/', $heritage_image, 'public');
            $add_image['heritage_id'] = $heritage->id;
            $add_image['image'] = $path;
            $add_image['user_id'] = $auth;
            $image->fill($add_image)->save();
        }
        
        $return_info = ['newId' => $heritage->id, 'message' => "世界遺産が追加されました！"];
        return response()->json($return_info);
    }
    
    // 世界遺産編集
    public function update(Request $request, Country $country, Heritage $heritage, Image $image) {
        $now = Carbon::now();
        $auth = Auth::id();
        $heritage_info['country_id'] = $request['country_id'];
        $heritage_info['name'] = $request['name'];
        $heritage_info['entrance_fee'] = $request['entrance_fee'];
        $heritage->fill($heritage_info)->save();
        
        // 画像を削除
        if (isset($request['del_imageId'])) {
            $delete_images_id = $request['del_imageId'];
            foreach ($delete_images_id as $delId) {
                $delimage_path = $image->where('id', $delId)->first()->image;
                Storage::disk('s3')->delete($delimage_path);
                $image->where("image", $delimage_path)->delete();
            }
        }
        
        // 画像を登録
        $heritage_images = $request->file('images');
        if (isset($heritage_images)) {
            foreach($heritage_images as $heritage_image) {
                $add_image = [];
                $image = new Image;
                $path = Storage::disk('s3')->putFile('/', $heritage_image, 'public');
                $add_image['heritage_id'] = $heritage->id;
                $add_image['image'] = $path;
                $add_image['user_id'] = $auth;
                $image->fill($add_image)->save();
            }
        }
        
        return response()->json('世界遺産情報が変更されました！');
    }
    
    // 世界遺産削除
    public function delete(Country $country, Heritage $heritage, Image $image) {
        $heritage_images = $image->where('heritage_id', $heritage->id)->get();
        
        // 画像削除
        foreach ($heritage_images as $heritage_image) {
            Storage::disk('s3')->delete($heritage_image->image);
            $image->where('id', $heritage_image->id)->delete();
        }
        $heritage->delete();
        
        return response()->json('世界遺産削除が完了しました！');
    }
}
