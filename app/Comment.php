<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;
    
    // コメントにユーザー名とアイコン情報を付与して返す
    public function setComments(int $id, int $limit, String $met) {
        $array = [];
        $method = $met == "mypage" ? $this->where('user_id', $id)->get() : $this->getOrderbyComment($id, $limit);
        foreach($method as $comment) {
            $user_table = new User;
            array_push(
                $array, 
                ['comment' => $comment, 'username' => $user_table->getName($comment->user_id), 'avatar' => $user_table->getIcon($comment->user_id)]
            );
        }
        return $array;
    }
    
    // コメントを最新のもの順で取得
    public function getOrderbyComment(int $heritage_id, int $limit) {
        return $this->where('heritage_id', $heritage_id)->orderBy('created_at', 'desc')->limit($limit)->get();
    }
    
    
    // コメント→ユーザー（多対1）
    public function user() {
        return $this->belongsTo('App\User');
    }
    
    // コメント→世界遺産(多対1）
    public function heritage() {
        return $this->belongsTo('App\Heritage');
    }
}
