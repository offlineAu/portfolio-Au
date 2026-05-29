<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\PortfolioController as PortfolioSettingsController;
use App\Http\Controllers\Settings\SecurityController;
use App\Http\Controllers\Teams\TeamController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Controllers\Teams\TeamMemberController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('settings/portfolio', [PortfolioSettingsController::class, 'edit'])->name('portfolio.edit');
    Route::patch('settings/portfolio/profile', [PortfolioSettingsController::class, 'updateProfile'])->name('portfolio.profile.update');
    Route::post('settings/portfolio/skills', [PortfolioSettingsController::class, 'storeSkill'])->name('portfolio.skills.store');
    Route::patch('settings/portfolio/skills/{skill}', [PortfolioSettingsController::class, 'updateSkill'])->name('portfolio.skills.update');
    Route::delete('settings/portfolio/skills/{skill}', [PortfolioSettingsController::class, 'destroySkill'])->name('portfolio.skills.destroy');
    Route::post('settings/portfolio/projects', [PortfolioSettingsController::class, 'storeProject'])->name('portfolio.projects.store');
    Route::patch('settings/portfolio/projects/{project}', [PortfolioSettingsController::class, 'updateProject'])->name('portfolio.projects.update');
    Route::delete('settings/portfolio/projects/{project}', [PortfolioSettingsController::class, 'destroyProject'])->name('portfolio.projects.destroy');
    Route::post('settings/portfolio/experiences', [PortfolioSettingsController::class, 'storeExperience'])->name('portfolio.experiences.store');
    Route::patch('settings/portfolio/experiences/{experience}', [PortfolioSettingsController::class, 'updateExperience'])->name('portfolio.experiences.update');
    Route::delete('settings/portfolio/experiences/{experience}', [PortfolioSettingsController::class, 'destroyExperience'])->name('portfolio.experiences.destroy');
    Route::post('settings/portfolio/focus-items', [PortfolioSettingsController::class, 'storeFocusItem'])->name('portfolio.focus-items.store');
    Route::patch('settings/portfolio/focus-items/{focusItem}', [PortfolioSettingsController::class, 'updateFocusItem'])->name('portfolio.focus-items.update');
    Route::delete('settings/portfolio/focus-items/{focusItem}', [PortfolioSettingsController::class, 'destroyFocusItem'])->name('portfolio.focus-items.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])->name('security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');

    Route::get('settings/teams', [TeamController::class, 'index'])->name('teams.index');
    Route::post('settings/teams', [TeamController::class, 'store'])->name('teams.store');

    Route::middleware(EnsureTeamMembership::class)->group(function () {
        Route::get('settings/teams/{team}', [TeamController::class, 'edit'])->name('teams.edit');
        Route::patch('settings/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
        Route::delete('settings/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
        Route::post('settings/teams/{team}/switch', [TeamController::class, 'switch'])->name('teams.switch');

        Route::patch('settings/teams/{team}/members/{user}', [TeamMemberController::class, 'update'])->name('teams.members.update');
        Route::delete('settings/teams/{team}/members/{user}', [TeamMemberController::class, 'destroy'])->name('teams.members.destroy');

        Route::post('settings/teams/{team}/invitations', [TeamInvitationController::class, 'store'])->name('teams.invitations.store');
        Route::delete('settings/teams/{team}/invitations/{invitation}', [TeamInvitationController::class, 'destroy'])->name('teams.invitations.destroy');
    });
});
