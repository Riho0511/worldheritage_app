<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Nice extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'country_id',
        'heritage_id',
        'user_id',
    ];
    
    public function user() {
        return $this->belongsTo('App\User');
    }
 
    public function country() {
        return $this->belongsTo('App\Country');
    }
    
    public function heritage() {
        return $this->belongsTo('App\Heritage');
    }
}
