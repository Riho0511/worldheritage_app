<?php

namespace App\Http\Controllers;

use App\Image;
use App\Heritage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    // 画像投稿
    public function store(Request $request, Heritage $heritage) {
        $heritage_images = $request->file('images');
        foreach($heritage_images as $heritage_image) {
            $image = new Image;
            $path = Storage::disk('s3')->putFile('/', $heritage_image, 'public');
            $image->heritage_id = $heritage->id;
            $image->image = $path;
            $image->user_id = Auth::id();
            $image->save();
        }
        $message = "画像が投稿されました！";
        $images = Image::where('heritage_id', $heritage->id)->get();
        
        return response()->json(compact('message', 'images'));
    }
}
