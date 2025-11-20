<?php

namespace App\Http\Resources\Api\Post;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'some_information' => $this->some_information,
            'tag' => $this->tag->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name,
                ];
            }),
            'photos' => $this->photos->map(function ($photo) {
                return [
                    'id' => $photo->id,
                    'path_photo' => $photo->path_photo,
                    'url' => Storage::url($photo->path_photo),
                ];
            }),
            'likes' => $this->likes,
            'likesCount' => count($this->likes),
            'comments' => $this->comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'comment' => $comment->body,
                ];
            }),
            'creation_date' => $this->created_at,
            'update_date' => $this->updated_at
        ];
    }
}
