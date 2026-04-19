<?php

use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\PortfolioController;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/portfolio/unlock', [PortfolioController::class, 'unlock'])->name('portfolio.unlock');
Route::get('/portfolio/media/github-avatar', [PortfolioController::class, 'updateGithubAvatar'])->name('portfolio.media.github-avatar');
Route::get('/portfolio/media/facebook-avatar', [PortfolioController::class, 'updateFacebookAvatar'])->name('portfolio.media.facebook-avatar');
Route::get('/portfolio/media/facebook-cover', [PortfolioController::class, 'updateFacebookCover'])->name('portfolio.media.facebook-cover');
Route::get('/portfolio/lock', [PortfolioController::class, 'lock'])->name('portfolio.lock');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
});

require __DIR__.'/settings.php';
