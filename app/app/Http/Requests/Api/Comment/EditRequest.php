<?php

namespace App\Http\Requests\Api\Comment;

use App\Http\Requests\Api\ApiRequest;

class EditRequest extends ApiRequest
{

    public function rules(): array
    {
        return [
            'body' => 'required|string|max:355',
        ];
    }
}
