<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Sanctum\HasApiTokens;
class Profile extends Model
{
    use HasApiTokens;

    protected $fillable = [
        'name_tag',
        'first_name',
        'middle_name',
        'last_name',
        'description',
        'city',
        'year',
        'gender',
        'link',
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
