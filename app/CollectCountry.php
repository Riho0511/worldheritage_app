<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CollectCountry extends Model
{
    use SoftDeletes;
    
    // コレクト→ユーザー（多対1）
    public function users() {
        return $this->belongsTo('App\User');
    }
    
    // コレクト→国（多対1）
    public function countries() {
        return $this->belongsTo('App\Country');
    }
}
