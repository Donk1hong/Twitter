<?php

namespace App\Models;

use App\Events\User\ProfileCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;


    protected static function booted() : void
    {
        static::created(function ($user) {
            ProfileCreated::dispatch($user);
        });
    }

    protected $fillable = [
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function profile() : HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(PhotoPost::class);
    }

    public function likes(): HasMany
    {
        return $this->hasMany(LikePost::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
