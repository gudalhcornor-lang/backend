<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SpeakerBoxController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public (tanpa login)
Route::get('/health', fn() => response()->json(['status' => 'ok']));
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rekomendasi produk public
Route::get('/speakers/{id}/related', [SpeakerBoxController::class, 'related']);

// Admin create (butuh login)
Route::middleware('auth:sanctum')->post('/admin/add', [AdminController::class, 'addAdmin']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // CRUD Speakers
    Route::apiResource('/speakers', SpeakerBoxController::class);
Route::get('/speakers/{id}/related', [SpeakerBoxController::class, 'related']);

    // ---------------------------
    // ⭐ RATING ROUTES (diperbaiki)
    // ---------------------------
   // ⭐ Rating
Route::post('/rating', [RatingController::class, 'store']);
Route::get('/rating/my/{id}', [RatingController::class, 'myRating']);
Route::get('/rating/product/{id}', [RatingController::class, 'productRatings']);

    // Wishlist
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy']);
Route::post('/search', [SpeakerBoxController::class, 'search']);
 // ⭐ ADMIN USER LIST
    Route::get('/show-users', [UserController::class, 'index']);
    Route::delete('/show-users/{id}', [UserController::class, 'destroy']);
    Route::put('/show-users/{id}/role', [UserController::class, 'updateRole']);

});
