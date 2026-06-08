<?php

use App\Http\Controllers\Api\FeatureCategoryController;
use App\Http\Controllers\Api\FeatureController;
use Illuminate\Support\Facades\Route;

Route::apiResource('feature-categories', FeatureCategoryController::class);
Route::apiResource('features', FeatureController::class);