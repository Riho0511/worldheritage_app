<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CollectHeritage extends Model
{
    use SoftDeletes;
    
    // コレクト→ユーザー（多対1)
    public function users() {
        return $this->belongsTo('App\User');
    }
    
    // コレクト→世界遺産（多対1）
    public function heritages() {
        return $this->belongsTo('App\Heritage');
    }
}
