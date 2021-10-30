<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'heritage_id',
        'image',
    ];
    
    public function heritage() {
        return $this->belongsTo('App\Heritage');
    }
}
