<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name',
        'official_name',
        'capital',
        'time_difference',
        'plane_movement',
        'state',
    ];
    
    public function heritages() {
        return $this->hasMany('App\Heritage');
    }
    
    public function currencies() {
        return $this->belongsToMany('App\Currency');
    }
    
    public function collects() {
        return $this->hasMany('App\Collect');
    }
 
    public function nices() {
        return $this->hasMany('App\Nice');
    }
}
