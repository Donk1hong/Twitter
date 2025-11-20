<?php

namespace App\Http\Requests\Api\Profile;

use App\Http\Requests\Api\ApiRequest;

class PasswordUpdate extends ApiRequest
{
    public function rules(): array
    {
        return [
            'last_password' => 'required|string|min:6',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|min:6',
        ];
    }
}
