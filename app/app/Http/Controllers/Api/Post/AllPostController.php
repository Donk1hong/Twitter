<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Post\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use function Laravel\Prompts\error;

class AllPostController extends Controller
{
    public function index()
    {
        $posts = Post::all();

        return response()->json([
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function show(Post $post)
    {
        return response()->json([
            'post' => new PostResource($post),
        ]);
    }
}
