<?php

namespace App\Http\Requests\Api\Profile;

use App\Http\Requests\Api\ApiRequest;

class StoreRequest extends ApiRequest
{

    public function rules(): array
    {
        return [
            'name_tag' => 'string|max:8',
            'first_name' => 'string|max:25',
            'middle_name' => 'string|max:25',
            'last_name' => 'string|max:25',
            'description' => 'string|max:355',
            'city' => 'string|max:25',
            'year' => 'integer|max:150',
            'gender' => 'in:male,female',
            'link' => 'string|max:255',
            'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
