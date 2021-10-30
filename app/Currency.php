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
    
    public function countries() {
        return $this->belongsToMany('App\Country');
    }
}
