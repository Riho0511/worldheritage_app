<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Heritage extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'country_id', 'name', 'entrance_fee',
    ];
    
    
    // お気に入り登録しているかどうか（全部）
    public function isCheck(String $type, int $user_id, int $country_id) {
        $array = [];
        $all = $this->with($type)->where('country_id', $country_id)->get();
        foreach($all as $part) {
            if ($type == 'like_users') {
                if ($part->like_users->where('user_id', $user_id)->where('liked', 1) == [] || $part->like_users->where('user_id', $user_id)->where('liked', 1)->first() == null) {
                    array_push($array, false);
                } else {
                    array_push($array, (bool)$part->like_users->first()->liked);
                }
            } else if ($type == 'collect_users') {
                if ($part->collect_users->where('user_id', $user_id)->where('collected', 1) == [] || $part->collect_users->where('user_id', $user_id)->where('collected', 1)->first() == null) {
                    array_push($array, false);
                } else {
                    array_push($array, (bool)$part->collect_users->first()->collected);
                }
            }
        }
        return $array;
    }
        
    
    // お気に入り登録しているかどうか（1つ）
    public function isLiked(User $user){
        if ($user) {
            $liked = $this->like_users->where('user_id', $user->id)->where('liked', 1)->first();
            if ($liked != null) {
                return (bool)$liked->liked;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    // コレクトしているかどうか（1つ）
    public function isCollected(User $user){
        if ($user) {
            $collected = $this->collect_users->where('user_id', $user->id)->where('collected', 1)->first();
            if ($collected != null) {
                return (bool)$collected->collected;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    // お気に入り総数取得
    public function getLikeCount() {
        return $this->like_users->where('liked', 1)->count();
    }
    
    // お気に入り総数取得
    public function getCollectCount() {
        return $this->collect_users->where('collected', 1)->count();
    }
    
    
    // 世界遺産→国（多対1）
    public function country() {
        return $this->belongsTo('App\Country');
    }
    
    // 世界遺産→画像（1対多）
    public function images() {
        return $this->hasMany('App\Image');
    }
    
    // 世界遺産→コレクト(ユーザー)（1対多）
    public function collect_users() {
        return $this->hasMany('App\CollectHeritage');
    }
 
    // 世界遺産→お気に入り(ユーザー)（1対多）
    public function like_users() {
        return $this->hasMany('App\LikeHeritage');
    }
    
    // 世界遺産→コメント（1対多）
    public function comments() {
        return $this->hasMany('App\Comment');
    }
}
