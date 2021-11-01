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
        $comment_info["user_id"] = $request["user_id"];
        $comment_info["username"] = $user->name;
        $comment_info["rate"] = $request["rate"];
        $comment_info["comment"] = $request["comment"];
        $comment_info["anonymous"] = $request["anonymous"];
        $comment->fill($comment_info)->save();
        
        $return_info = ['comment' => $comment, 'message' => "コメントが投稿されました！"];
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
        $return_info = ['auth' => $auth, 'comments' => $comments];
        
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
