<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Sanctum\HasApiTokens;

class LikePost extends Model
{

    use HasApiTokens;
    protected $fillable = ['user_id', 'post_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    public function posts(): belongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
