<?php

namespace App\Http\Controllers\Api\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Comment\CreateRequest;
use App\Http\Requests\Api\Comment\EditRequest;
use App\Http\Resources\Api\Comment\CommentResource;


class CommentController extends Controller
{
    public function index($post , $comment)
    {
        $user = auth()->user();

        $post = $user->posts()->findOrFail($post);

        $comment = $post->comments()->findOrFail($comment);

        return response()->json([
            'comment' => $comment,
        ], 200);
    }

    public function allComment($post)
    {
       $user = auth()->user();

       $post = $user->posts()->findOrFail($post);

        $comments = $post->comments;

        return response()->json([
            'comments' => $comments,
        ] , 200);
    }

    public function store($post, CreateRequest $request)
    {
        $user = auth()->user();

        $post = $user->posts()->findOrFail($post);

        $data = $request->validated();

        $comment = $post->comments()->create([
           'user_id' => $user->id,
           'body' => $data['body'],
        ]);

        return response()->json([
            'message' => 'Комментарий создан.',
            'comment' => new CommentResource($comment),
        ], 201);
    }

    public function edit($post, $comment, EditRequest $request)
    {
        $user = auth()->user();

        $post = $user->posts()->findOrFail($post);

        $comment = $post->comments()->findOrFail($comment);

        $comment->update($request->validated());

        return response()->json([
            'message' => 'Заметка обновлена.',
            'comment' => new CommentResource($comment),
        ], 200);
    }

    public function delete($post, $comment)
    {
        $user = auth()->user();

        $post = $user->posts()->findOrFail($post);

        $comment = $post->comments()->findOrFail($comment);

        $comment->delete();

        return response()->json([
            'message' => 'Комментарий удалён.'
        ], 200);
    }
}
