<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name', 'official_name', 'capital', 'time_difference', 'plane_movement', 'state_id',
    ];
    
    
    // お気に入り登録しているかどうか
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
    
    // コレクトしているかどうか
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
    
    // コレクト総数取得
    public function getCollectCount() {
        return $this->collect_users->where('collected', 1)->count();
    }
    
    
    // 国→州（多対1）
    public function state() {
        return $this->belongsTo('App\State');
    }
    
    // 国→世界遺産（1対多）
    public function heritages() {
        return $this->hasMany('App\Heritage');
    }
    
    // 国→通貨（多対多）
    public function currencies() {
        return $this->belongsToMany('App\Currency');
    }
    
    // 国→コレクト(ユーザー)（1対多）
    public function collect_users() {
        return $this->hasMany('App\CollectCountry');
    }
 
    // 国→お気に入り(ユーザー)（1対多）
    public function like_users() {
        return $this->hasMany('App\LikeCountry');
    }
}
