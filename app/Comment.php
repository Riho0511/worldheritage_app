<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'heritage_id',
        'user_id',
        'rate',
        'comment',
        'anonymous',
    ];
    
    public function user() {
        return $this->belongsTo('App\User');
    }
    
    public function heritage() {
        return $this->belongsTo('App\Heritage');
    }
}
