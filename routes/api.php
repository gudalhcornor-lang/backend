<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SpeakerBoxController;

/*
| API routes
*/

// public
Route::get('/health', fn() => response()->json(['status' => 'ok']));
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// admin create (butuh token + role check inside controller)
Route::middleware('auth:sanctum')->post('/admin/add', [AdminController::class, 'addAdmin']);

// protected routes (need sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    // resource speakers
    Route::apiResource('speakers', SpeakerBoxController::class);
});
