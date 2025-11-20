<?php

namespace App\Http\Requests\Api\Post;

use App\Http\Requests\Api\ApiRequest;

class CreateRequest extends ApiRequest
{
    public function rules(): array
    {
        return [
            'some_information' => 'required|string|min:1|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ];
    }
}
