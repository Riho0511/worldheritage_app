<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LikeCountry extends Model
{
    use SoftDeletes;
    
    
    // お気に入り→ユーザー（多対1）
    public function users() {
        return $this->belongsTo('App\User');
    }
    
    // お気に入り→国（多対1）
    public function countries() {
        return $this->belongsTo('App\Country');
    }
}
