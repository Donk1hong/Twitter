<?php

namespace App\Http\Controllers\Api\User;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\ForgotPasswordRequest;
use App\Http\Requests\Api\User\LoginRequest;
use App\Http\Requests\Api\User\RegisterRequest;
use App\Http\Requests\Api\User\ResetPasswordRequest;
use App\Http\Resources\Api\User\AuthResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();


        $user = User::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);


        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'Вы успешно зарегистрировались.',
            'token' => $token,
            'user' => new AuthResource($user),
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        if (auth()->attempt($request->validated())) {
            $user = auth()->user();

            $user->tokens()->delete();

            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Вы успешно авторизовались.',
                'token' => $token,
                'user' => new AuthResource($user),
            ]);
        }

        throw ValidationException::withMessages([
            'message' => 'Неправильный пароль.',
        ]);
    }

    public function me()
    {
        $user = auth()->user();

        return response()->json([
            'user' => new AuthResource($user),
        ]);
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $email = $request->validated();

        $status = Password::sendResetLink($email);

        return response()->json([
            'message' => __($status),
        ], $status === Password::RESET_LINK_SENT ? 201 : 422);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return response()->json([
            'message' => __($status),
        ], $status === Password::PASSWORD_RESET ? 201 : 422);
    }

    public function logout()
    {
        $user = auth()->user();

        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Вы вышли с аккаунта.',
        ]);
    }

    public function deleteUser()
    {
        $user = auth()->user();

        $user->forceDelete();

        return response()->json([
            'message' => 'Вы полностью удалили аккаунт.'
        ]);
    }
}
