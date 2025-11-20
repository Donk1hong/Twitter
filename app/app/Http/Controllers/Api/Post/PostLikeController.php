<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use App\Models\LikePost;
use App\Models\Post;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{
    public function like(Request $request, Post $post)
    {
        $user = $request->user();

        $post->likes()->firstOrCreate([
            'user_id' => $user->id,
            'post_id' => $post->id
        ]);

        return response()->json([
            'user_id' => $user->id,
            'post_id' => $post->id,
            'likes' => true,



        ]);
    }

    public function dislike($post)
    {
        $user = auth()->user;

        $post = $user->posts;

        LikePost::query()
            ->where(['post_id' => $post->id, 'user_id' => $user->id])
            ->delete();

        return response()->json([
            'likes' => false,
            'likesCount' => count($post->likes),
        ]);

    }
}
