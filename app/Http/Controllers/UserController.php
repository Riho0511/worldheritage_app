<?php

namespace App\Http\Controllers;

use App\User;
use App\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UserController extends Controller
{
    // マイページ
    public function mypage() {
        $authId = Auth::id();
        $user = new User;
        $userInfo = $user->where('id', $authId)->first();
        $return_info = ['user' => $userInfo];
        
        return response()->json($return_info);
    }
}
