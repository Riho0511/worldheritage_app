<?php

namespace App\Http\Controllers;

use App\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StateController extends Controller
{
    // ホーム画面
    public function index() {
        $states = new State;
        return response()->json($states->get());
    }
    
    // 州別国一覧画面
    public function state(State $state) {
        $countries = $state->countries()->get();
        if (Auth::check()) {
            $likes = Auth::user()->getCountriesLike();
            $collects = Auth::user()->getCountriesCollect();
        } else {
            $like = [];
            $collects = [];
        }
        
        return response()->json(compact('state', 'countries', 'likes', 'collects'));
    }
}
