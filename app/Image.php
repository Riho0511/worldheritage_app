<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'heritage_id', 'image', 'user_id'
    ];
    
    
    // 画像→世界遺産（多対1）
    public function heritage() {
        return $this->belongsTo('App\Heritage');
    }
}
