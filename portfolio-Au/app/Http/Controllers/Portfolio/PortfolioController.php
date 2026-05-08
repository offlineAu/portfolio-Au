<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Services\ProfileDataService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function __construct(
        private readonly ProfileDataService $profileDataService,
    ) {}

    /**
     * Show the public portfolio page.
     */
    public function index(Request $request): Response
    {
        $profile = Profile::query()
            ->with(['skills', 'projects', 'experiences', 'focusItems'])
            ->firstOrFail();

        return Inertia::render('Portfolio/Show', [
            'pageTitle' => $profile->page_title,
            'profile' => $this->toPageProfile($profile),
            'canEditMedia' => (bool) $request->session()->get('portfolio_edit_unlocked', false),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function toPageProfile(Profile $profile): array
    {
        return $this->profileDataService->toPageProfile($profile);
    }

    /**
     * @return array<int, string>
     */
    private function toDetailLines(mixed $details): array
    {
        return $this->profileDataService->toDetailLines($details);
    }
}
