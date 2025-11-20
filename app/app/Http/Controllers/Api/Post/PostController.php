<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Post\CreateRequest;
use App\Http\Requests\Api\Post\EditRequest;
use App\Http\Resources\Api\Post\PostResource;
use App\Models\PhotoPost;
use App\Models\Post;
use App\Services\TagServices;

class PostController extends Controller
{
    public function index($post)
    {
        $user = auth()->user();

        $post = $user->posts()->find($post);

        return response()->json([
            'post' => new PostResource($post),
        ]);
    }

    public function postList()
    {
        $user = auth()->user();

        $posts = $user->posts();

        if ($posts->comments->count() > 0) {
             return response()->json([
                 'posts' => PostResource::collection($posts),
                 [
                     'comments' => 'У поста пока нету комментариев',
                 ]
             ]);
        }

        return response()->json([
            'post' => PostResource::collection($posts),
        ]);
    }

    public function store(CreateRequest $request, TagServices $tagServices)
    {
        $user = auth()->user();

        $post = $user->posts()->create($request->validated());

        $tagServices->syncPostTags($post, $post->some_information);

        $post->load('tag');


        if (is_null($request->file('photo'))) {
            return response()->json([
                'message' => 'Вы успешно создали пост.',
                'post' => new PostResource($post),
            ]);
        }

        $path = $request->file('photo')->store('photos', 'public');

        $post->photos()->create([
            'user_id' => $user->id,
            'path_photo' => $path,
        ]);

        return response()->json([
            'message' => 'Вы успешно создали пост.',
            'post' => new PostResource($post),
        ]);
    }

    public function edit($post, EditRequest $request, TagServices $tagServices)
    {
        $user = auth()->user();

        $post = $user->posts()->findOrFail($post);

        $post->update($request->validated());

        $tagServices->syncPostTags($post, $post->some_information);

        $post->load('tags');

         if ($post->comments->count() > 0) {
             return response()->json([
                 'posts' => PostResource::collection($post),
             ]);
        }

        if (is_null($request->file('photo'))) {
            return response()->json([
                'message' => 'Вы успешно создали пост.',
                'post' => new PostResource($post),
            ]);
        }

        $photo = $request->file('photo')->store('public');

        $photos = PhotoPost::update([
            'post_id' => $post->id,
            'path_photo' => $photo,
        ]);



        return response()->json([
            'message' => 'Вы успешно обновили пост.',
            'post' => $post,
        ]);
    }

    public function delete($post)
    {
        $user = auth()->user();

        $post = $user->posts()->findOrFail($post);

        $post->delete();

        return response()->json([
            'message' => 'Пост успешно удалён'
        ]);
    }
}
