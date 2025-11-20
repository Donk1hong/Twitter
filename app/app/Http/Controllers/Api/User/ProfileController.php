<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Profile\EditRequest;
use App\Http\Requests\Api\Profile\PasswordUpdate;
use App\Http\Requests\Api\Profile\StoreRequest;
use App\Http\Resources\Api\User\ProfileResource;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index()
    {
        $profile = auth()->user()->profile();

        return response()->json([
            'profile' => new ProfileResource($profile),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $profile = auth()->user()->profile();

        $profile->create($request->validated());

        if (!$request->hasFile('avatar'))
        {
            return response()->json([
                'profile' => new ProfileResource($profile),
            ]);
        }

        $path = $request->file('avatar')->store('avatars', 'public');

        $profile->avatar = $path;

        $profile->save;

        return response()->json([
            'message' => 'Круто, вы добавили информацию о себе!',
            'profile' => new ProfileResource($profile)
        ], 201);
    }

    public function edit(EditRequest $request)
    {
         $profile = auth()->user()->profile();

         $profile->update($request->validated());

         return response()->json([
             'message' => 'Вы успешно обновили информацию о себе!',
             'profile' => new ProfileResource($profile),
         ], 201);
    }

    public function passwordUpdate(PasswordUpdate $request)
    {
        $data = $request->validated();

        $user = auth()->user();

        $profile = auth()->user()->profile();

        if (Hash::check($data['password'], $user->getAuthPassword())) {
            $profile->update(['password' => Hash::make($data['password'])]);

            $user->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Вы успешно обновили пароль'
            ]);
        }
        return response()->json([
           'message' => 'Пароли не совпадают.'
        ]);
    }
}
