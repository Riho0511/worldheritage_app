<?php

namespace App\Http\Controllers;

use App\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StateController extends Controller
{
    // ホーム画面
    public function index() {
        $user = Auth::user();
        $states = State::get();
        return response()->json(compact('user', 'states'));
    }
    
    // 州別国一覧画面
    public function state(State $state) {
        $user = Auth::user();
        $countries = $state->countries()->get();
        if (Auth::check()) {
            $likes = Auth::user()->getCountriesLike();
            $collects = Auth::user()->getCountriesCollect();
        } else {
            $likes = [];
            $collects = [];
        }
        
        return response()->json(compact('user', 'state', 'countries', 'likes', 'collects'));
    }
}
