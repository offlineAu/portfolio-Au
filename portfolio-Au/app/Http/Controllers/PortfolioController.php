<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\FocusItem;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\HTTP\RedirectResponse;
use Illuminate\HTTP\Request;
use Illuminate\HTTP\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    /**
     * Show the public portfolio page.
     */
    public function index(Request $request): Response
    {
        $profile = Profile::query()
            ->with(['skills', 'projects', 'experiences', 'focusItems'])
            ->firstOrFail();

        return Inertia::render('PortfolioShowcase', [
            'pageTitle' => $profile->page_title,
            'profile' => $this->toPageProfile($profile),
            'canEditMedia' => (bool) $request->session->get('portfolio_edit_unlocked', false),
        ]);
    }

    /**
     * Transform the profile model into the public page contract.
     *
     * @return array<string, mixed>
     */
    private function toPageProfile(Profile $profile): array
    {
        return [
            'name' => $profile->name,
            'username' => $profile->username,
            'bio' => $profile->bio,
            'title' => $profile->title,
            'location' => $profile->location,
            'email' => $profile->email,
            'availability' => $profile->availability ?: 'Open to work',
            'aboutHeading' => $profile->about_heading,
            'aboutSummary' => $profile->about_summary,
            'aboutPoints' => $profile->about_points ?? [],
            'websiteUrl' => $profile->website_url,
            'githubUrl' => $profile->github_url,
            'linkedinUrl' => $profile->linkedin_url,
            'resumeUrl' => $profile->resume_url,
            'avatarUrl' => $profile->avatar_url,
            'coverPhotoUrl' => $profile->cover_photo_url,
            'techStack' => $profile->skills
                ->map(fn (Skill $skill) => $skill->name)
                ->all(),
            'projects' => $profile->projects
                ->map(fn (Project $project) => [
                    'name' => $project->name,
                    'description' => $project->description,
                    'primaryLanguage' => $project->primary_language,
                    'tech' => $project->tech_stack ?? [],
                    'sourceUrl' => $project->source_url,
                    'liveUrl' => $project->live_url,
                    'starsCount' => $project->stars_count,
                    'forksCount' => $project->forks_count,
                ])
                ->all(),
            'experience' => $profile->experiences
                ->map(fn (Experience $experience) => [
                    'role' => $experience->role,
                    'organization' => $experience->organization,
                    'period' => $experience->period,
                    'details' => $this->toDetailLines($experience->details),
                ])
                ->all(),
            'currentFocus' => $profile->focusItems
                ->map(fn (FocusItem $focusItem) => $focusItem->content)
                ->all(),
        ];
    }

    /**
     * Normalize experience details into an array for the frontend contract.
     *
     * @return array<int, string>
     */
    private function toDetailLines(mixed $details): array
    {
        if (is_array($details)) {
            return array_values(array_filter($details, fn (mixed $line) => is_string($line) && $line !== ''));
        }

        if (! is_string($details) || trim($details) === '') {
            return [];
        }

        $lines = preg_split('/\r\n|\r|\n/', $details) ?: [];
        $cleanLines = array_values(array_filter(array_map('trim', $lines)));

        return $cleanLines !== [] ? $cleanLines : [trim($details)];
    }

    public function unlock(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'edit_key' => ['required', 'string'],
        ]);

        // TODO: Validate edit key against database or environment
        abort_if(! hash_equals((string) env('PORTFOLIO_EDIT_KEY'), $validated['edit_key']), 403, 'Invalid edit key');

        $request->session()->put('portfolio_edit_unlocked', true);
        
        return redirect()->back();
    }

        public function lock(Request $request): RedirectResponse
    {

        $request->session()->forget('portfolio_edit_unlocked');
        
        return redirect()->back();
    }

    //Continue Add Upload Methods
}
