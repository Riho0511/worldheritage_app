<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LikeHeritage extends Model
{
    use SoftDeletes;
    
    
    // お気に入り→ユーザー（多対1）
    public function users() {
        return $this->belongsTo('App\User');
    }
    
    // お気に入り→世界遺産（多対1）
    public function heritages() {
        return $this->belongsTo('App\Heritage');
    }
}
