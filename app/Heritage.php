<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Heritage extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'country_id',
        'name',
        'entrance_fee',
    ];
    
    public function country() {
        return $this->belongsTo('App\Country');
    }
    
    public function images() {
        return $this->hasMany('App\Image');
    }
    
    public function collects() {
        return $this->hasMany('App\Collect');
    }
    
    public function nices() {
        return $this->hasMany('App\Nice');
    }
    
    public function comments() {
        return $this->hasMany('App\Comment');
    }
}
