<?php

use App\Http\Controllers\Portfolio\PortfolioApiController;
use App\Http\Controllers\Portfolio\PortfolioAuthController;
use App\Http\Controllers\Portfolio\PortfolioController;
use App\Http\Controllers\Portfolio\PortfolioLandingController;
use App\Http\Controllers\Portfolio\PortfolioMediaController;
use App\Http\Controllers\Portfolio\RolePickerController;
use Illuminate\Support\Facades\Route;

// Root — your real portfolio
Route::get('/', [PortfolioLandingController::class, 'index'])->name('home');

// Role picker
Route::post('/role', [RolePickerController::class, 'store'])->name('portfolio.role.store');
Route::delete('/role', [RolePickerController::class, 'destroy'])->name('portfolio.role.destroy');

// Showcase — GitHub/Facebook clone demo
Route::get('/showcase', [PortfolioController::class, 'index'])->name('portfolio.showcase');

// Portfolio Authentication & Media Management
Route::prefix('portfolio')->group(function () {
    Route::controller(PortfolioAuthController::class)->group(function () {
        Route::post('/unlock', 'unlock')->name('portfolio.unlock');
        Route::post('/lock', 'lock')->name('portfolio.lock');
    });

    Route::prefix('media')
        ->middleware('portfolio.edit')
        ->controller(PortfolioMediaController::class)
        ->group(function () {
            Route::post('/github-avatar', 'updateGithubAvatar')->name('portfolio.media.github-avatar');
            Route::post('/facebook-avatar', 'updateFacebookAvatar')->name('portfolio.media.facebook-avatar');
            Route::post('/facebook-cover', 'updateFacebookCover')->name('portfolio.media.facebook-cover');
        });
});

// API Endpoints
Route::prefix('api/portfolio')
    ->controller(PortfolioApiController::class)
    ->group(function () {
        Route::get('/projects', 'projects')->name('api.portfolio.projects');
        Route::get('/metrics', 'metrics')->name('api.portfolio.metrics');
        Route::post('/sentiment', 'sentiment')->name('api.portfolio.sentiment');
    });