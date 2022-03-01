<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Currency extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'unit'
    ];
    
    // 通貨→国（多対多）
    public function countries() {
        return $this->belongsToMany('App\Country');
    }
}
