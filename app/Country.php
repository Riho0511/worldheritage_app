<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use SoftDeletes;
    
    public function heritages() {
        return $this->hasMany('App\Heritage');
    }
    
    public function currencies() {
        return $this->belongsToMany('App\Currency');
    }
}
