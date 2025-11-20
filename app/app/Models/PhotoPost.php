<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Sanctum\HasApiTokens;

class PhotoPost extends Model
{
    use HasApiTokens;

    protected $fillable = ['user_id', 'post_id',
        'photo_posts.path_photo',
        'path_photo'
    ];

    public function user(): belongsTo
    {
        return $this->belongsTo(Post::class);
    }

    public function post(): belongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
