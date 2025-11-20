<?php

use App\Http\Controllers\Api\Comment\CommentController;
use App\Http\Controllers\Api\Post\AllPostController;
use App\Http\Controllers\Api\Post\PostController;
use App\Http\Controllers\Api\Post\PostLikeController;
use App\Http\Controllers\Api\User\AuthController;
use App\Http\Controllers\Api\User\ProfileController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->middleware('guest')->group(function () {
    Route::post('register','register')->name('register');
    Route::post('login','login')->name('login');
    Route::get('forgot-password','forgotPassword')->name('password.forgot');
    Route::post('reset-password/{token}','resetPassword')->name('password.reset');
});

Route::name('user')->prefix('user')->middleware('auth:sanctum')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::get('me','me')->name('.me');
        Route::post('logout','logout')->name('.logout');
        Route::delete('delete','deleteUser')->name('.delete');
    });

    Route::controller(ProfileController::class)->prefix('profile')->middleware('auth:sanctum')->group(function () {
        Route::get('','index')->name('.profile');
        Route::post('create','store')->name('.profile.create');
        Route::patch('edit','edit')->name('.profile.edit');
        Route::patch('edit-password','passwordUpdate')->name('.profile.password.update');
    });

    Route::controller(PostController::class)->prefix('post')->group(function () {
        Route::get('{post}','index')->name('.post.index');
        Route::get('list','postList')->name('.post.list');
        Route::post('create','store')->name('.post.create');
        Route::patch('{post}/edit','edit')->name('.post.edit');
        Route::delete('{post}/delete','delete')->name('.post.delete');

        Route::controller(PostLikeController::class)->group(function () {
            Route::post('{post}/like','like')->name('.post.like');
            Route::delete('{post}/dislike','dislike')->name('.post.dislike');
        });

        Route::controller(CommentController::class)->prefix('{post}/comment')->group(function () {
            Route::get('list','allComment')->name('.post.comment.all');
            Route::get('{comment}','index')->name('.post.comment.index');
            Route::post('create','store')->name('.post.comment.create');
            Route::patch('{comment}/edit','edit')->name('.post.comment.edit');
            Route::delete('{comment}/delete','delete')->name('.post.comment.delete');
        });
    });
});

Route::controller(AllPostController::class)->prefix('posts')->group(function () {
    Route::get('','index')->name('posts.index');
    Route::get('{post}','show')->name('posts.show');
});





