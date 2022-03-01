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
    // コメント一覧表示
    public function index(Country $country, Heritage $heritage) {
        $comment_table = new Comment;
        // 全コメント最新順
        $comments = $comment_table->setComments($heritage->id, 5000, "");
        // コメントの総数取得
        $comment_count = $heritage->comments()->count();
        
        return response()->json(compact('comments', 'comment_count'));
    }
    
    // コメント投稿
    public function comment(Request $request, Heritage $heritage) {
        $comment = new Comment;
        $comment_table = new Comment;
        $comment->heritage_id = $heritage->id;
        $comment->user_id = Auth::id();
        $comment->rate = $request['rate'];
        $comment->comment = $request['comment'];
        $comment->anonymous = $request["anonymous"];
        $comment->save();
        
        $message = "コメントが投稿されました！";
        $comment_count = $heritage->comments()->count();
        $two_comments = $comment_table->setComments($heritage->id, 2, "");
        
        return response()->json(compact('message', 'comment_count', 'two_comments'));
    }
    
    // コメント削除
    public function delete(Request $request, Heritage $heritage) {
        Comment::where('id', $request['id'])->delete();
        $comment_table = new Comment;
        
        $message = "コメントが削除されました！";
        $comment_count = $heritage->comments()->count();
        $two_comments = $comment_table->setComments($heritage->id, 2, "");
        
        return response()->json(compact('message', 'two_comments', 'comment_count'));
    }
}
