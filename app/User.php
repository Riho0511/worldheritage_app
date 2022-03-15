<?php

namespace App;

use App\Country;
use App\Heritage;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'image', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    
    // ユーザーのお気に入り、コレクトに関する国、世界遺産情報取得
    public function getInfo(User $user, String $info, String $genre) {
        $return_info = [];
        
        if ($info == "country") {
            if ($genre == "like") {
                $information = $user->like_countries()->where('liked', 1)->get();
            } else {
                $information = $user->collect_countries()->where('collected', 1)->get();
            }
            
            foreach($information as $inf) {
                array_push($return_info, Country::where('id', $inf->country_id)->first());
            }
        } else {
            if ($genre == "like") {
                $information = $user->like_heritages()->where('liked', 1)->get();
            } else {
                $information = $user->collect_heritages()->where('collected', 1)->get();
            }
            
            foreach($information as $inf) {
                array_push($return_info, Heritage::where('id', $inf->heritage_id)->first());
            }
        }
        
        return $return_info;
    }
    
    // 州別国お気に入り情報取得
    public function getCountriesLike() {
        $likes = $this->like_countries()->where('liked', 1);
        if ($likes !== []) {
            return $likes->get(['country_id']);
        } else {
            return [];
        }
    }
    
    // 州別国コレクト情報取得
    public function getCountriesCollect() {
        $collects = $this->collect_countries()->where('collected', 1);
        if ($collects !== []) {
            return $collects->get(['country_id']);
        } else {
            return [];
        }
    }
    
    // 名前を取得
    public function getName(int $user_id) {
        return $this->where('id', $user_id)->first()->name;
    }
    
    // ユーザーアイコン画像を取得
    public function getIcon(int $user_id) {
        return $this->where('id', $user_id)->first()->image;
    }
    
    
    // ユーザー→コレクト(国)（1対多）
    public function collect_countries() {
        return $this->hasMany('App\CollectCountry');
    }
    
    // ユーザー→コレクト(世界遺産)（1対多）
    public function collect_heritages() {
        return $this->hasMany('App\CollectHeritage');
    }
 
    // ユーザー→お気に入り(国)（1対多）
    public function like_countries() {
        return $this->hasMany('App\LikeCountry');
    }
    
    // ユーザー→お気に入り(世界遺産)（1対多）
    public function like_heritages() {
        return $this->hasMany('App\LikeHeritage');
    }
    
    // ユーザー→コメント（1対多）
    public function comments() {
        return $this->hasMany('App\Comment');
    }
    
    // ユーザー→コメント（1対多）
    public function comments() {
        return $this->hasMany('App\Comment');
    }
}
