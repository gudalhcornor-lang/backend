<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SpeakerBoxController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/admin/add', [AdminController::class, 'addAdmin']);
});

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('me',[AuthController::class,'me']);
    Route::post('logout',[AuthController::class,'logout']);

    Route::apiResource('speakers', SpeakerBoxController::class);
});
