<?php

use App\Http\Controllers\SpeakerBoxController;
use Illuminate\Support\Facades\Route;

Route::apiResource('speakers', SpeakerBoxController::class);
