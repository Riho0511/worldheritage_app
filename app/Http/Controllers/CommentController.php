<?php

namespace App\Http\Controllers;

use App\Country;
use App\Heritage;
use App\User;
use App\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CommentController extends Controller
{
    // コメント投稿
    public function comment(Request $request, Heritage $heritage, User $user, Comment $comment) {
        $comment_info["heritage_id"] = $request["heritage_id"];
        $comment_info["user_id"] = $user->id;
        $comment_info["rate"] = $request["rate"];
        $comment_info["comment"] = $request["comment"];
        $comment_info["anonymous"] = $request["anonymous"];
        $comment->fill($comment_info)->save();
        $username = $user->name;
        $avatar = $user->avatar;
        
        $return_info = ['comment' => $comment, 'username' => $username, 'avatar' => $avatar, 'message' => "コメントが投稿されました！"];
        return response()->json($return_info);
    }
    
    // コメント一覧表示
    public function commentList(Country $country, Heritage $heritage, Comment $comment) {
        if (Auth::check()) {
            $auth = Auth::id();
        } else {
            $auth = null;
        }
        $comments = $comment->where('heritage_id', $heritage->id)->orderBy('created_at', 'desc')->get();
        $comments_username = [];
        $comments_avatar = [];
        foreach($comments as $comment) {
            $user = new User;
            $array1 = $user->where('id', $comment->user_id)->first()->name;
            $array2 = $user->where('id', $comment->user_id)->first()->image;
            array_push($comments_username, $array1);
            array_push($comments_avatar, $array2);
        }
        
        $return_info = ['auth' => $auth, 'comments' => $comments, 'commentsUsername' => $comments_username, 'commentsAvatar' => $comments_avatar];
        return response()->json($return_info);
    }
    
    // コメント削除
    public function delete(Request $request, Heritage $heritage, User $user, Comment $comment) {
        $comment->where('id', $request['id'])->delete();
        $comments = $comment->where('heritage_id', $heritage->id)->orderBy('created_at', 'desc')->get();
        $twoComments = $comment->where('heritage_id', $heritage->id)->orderBy('created_at', 'desc')->limit(2)->get();
        
        $return_info = ['comments' => $comments, 'twoComments' => $twoComments, 'message' => "コメントが削除されました！"];
        return response()->json($return_info);
    }
}
