<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Heritage extends Model
{
    use SoftDeletes;
    
    public function country() {
        return $this->belongsTo('App\Country');
    }
    
    public function images() {
        return $this->hasMany('App\Image');
    }
}
