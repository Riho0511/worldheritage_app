<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    // 州→国（1対多）
    public function countries() {
        return $this->hasMany('App\Country');
    }
}
