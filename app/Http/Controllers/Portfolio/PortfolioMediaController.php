<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Services\ProfileImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class PortfolioMediaController extends Controller
{
    public function __construct(
        private readonly ProfileImageService $profileImageService,
    ) {}

    public function updateGithubAvatar(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'github_avatar' => ['required', 'image', 'max:5120'],
        ]);

        $profile = $this->profile();
        $url = $this->storeProfileImage(
            $validated['github_avatar'],
            $profile->github_avatar_url,
            'portfolio/github-avatar',
        );

        $profile->update([
            'github_avatar_url' => $url,
        ]);

        return back();
    }

    public function updateFacebookAvatar(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'facebook_avatar' => ['required', 'image', 'max:5120'],
        ]);

        $profile = $this->profile();
        $url = $this->storeProfileImage(
            $validated['facebook_avatar'],
            $profile->facebook_avatar_url,
            'portfolio/facebook-avatar',
        );

        $profile->update([
            'facebook_avatar_url' => $url,
        ]);

        return back();
    }

    public function updateFacebookCover(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'facebook_cover' => ['required', 'image', 'max:8192'],
        ]);

        $profile = $this->profile();
        $url = $this->storeProfileImage(
            $validated['facebook_cover'],
            $profile->facebook_cover_photo_url,
            'portfolio/facebook-cover',
        );

        $profile->update([
            'facebook_cover_photo_url' => $url,
        ]);

        return back();
    }

    private function profile(): Profile
    {
        return Profile::query()
            ->with(['skills', 'projects', 'experiences', 'focusItems'])
            ->firstOrFail();
    }

    private function storeProfileImage(
        UploadedFile $file,
        ?string $currentUrl,
        string $directory,
    ): string {
        return $this->profileImageService->storeProfileImage($file, $currentUrl, $directory);
    }

    private function deleteLocalProfileImage(?string $url): void
    {
        $this->profileImageService->deleteLocalProfileImage($url);
    }
}
