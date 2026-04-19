<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Models\FocusItem;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Show the portfolio management page.
     */
    public function edit(): Response
    {
        $profile = $this->profile();

        return Inertia::render('settings/portfolio', [
            'profile' => [
                'pageTitle' => $profile->page_title,
                'name' => $profile->name,
                'username' => $profile->username,
                'title' => $profile->title,
                'location' => $profile->location,
                'email' => $profile->email,
                'availability' => $profile->availability,
                'bio' => $profile->bio,
                'aboutHeading' => $profile->about_heading,
                'aboutSummary' => $profile->about_summary,
                'aboutPoints' => $profile->about_points ?? [],
                'websiteUrl' => $profile->website_url,
                'githubUrl' => $profile->github_url,
                'linkedinUrl' => $profile->linkedin_url,
                'resumeUrl' => $profile->resume_url,
                'avatarUrl' => $profile->avatar_url,
                'coverPhotoUrl' => $profile->cover_photo_url,
            ],
            'skills' => $profile->skills->map(fn (Skill $skill) => [
                'id' => $skill->id,
                'name' => $skill->name,
                'category' => $skill->category,
                'sortOrder' => $skill->sort_order,
            ])->all(),
            'projects' => $profile->projects->map(fn (Project $project) => [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'primaryLanguage' => $project->primary_language,
                'techStack' => $project->tech_stack ?? [],
                'sourceUrl' => $project->source_url,
                'liveUrl' => $project->live_url,
                'starsCount' => $project->stars_count,
                'forksCount' => $project->forks_count,
                'sortOrder' => $project->sort_order,
                'isFeatured' => $project->is_featured,
            ])->all(),
            'experiences' => $profile->experiences->map(fn (Experience $experience) => [
                'id' => $experience->id,
                'role' => $experience->role,
                'organization' => $experience->organization,
                'period' => $experience->period,
                'details' => $experience->details,
                'sortOrder' => $experience->sort_order,
            ])->all(),
            'focusItems' => $profile->focusItems->map(fn (FocusItem $focusItem) => [
                'id' => $focusItem->id,
                'content' => $focusItem->content,
                'sortOrder' => $focusItem->sort_order,
            ])->all(),
        ]);
    }

    /**
     * Update the profile-level content.
     */
    public function updateProfile(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'page_title' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'availability' => ['nullable', 'string', 'max:255'],
            'bio' => ['required', 'string'],
            'about_heading' => ['required', 'string', 'max:255'],
            'about_summary' => ['required', 'string'],
            'about_points_text' => ['nullable', 'string'],
            'website_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'resume_url' => ['nullable', 'url', 'max:255'],
            'avatar_file' => ['nullable', 'image', 'max:5120'],
            'cover_photo_file' => ['nullable', 'image', 'max:8192'],
            'avatar_url' => ['nullable', 'url', 'max:255'],
            'cover_photo_url' => ['nullable', 'url', 'max:255'],
        ]);

        $profile = $this->profile();

        $avatarUrl = $validated['avatar_url'] ?? null;
        if ($request->file('avatar_file') instanceof UploadedFile) {
            $avatarUrl = $this->storeProfileImage(
                $request->file('avatar_file'),
                $profile->avatar_url,
                'portfolio/avatar',
            );
        }

        $coverPhotoUrl = $validated['cover_photo_url'] ?? null;
        if ($request->file('cover_photo_file') instanceof UploadedFile) {
            $coverPhotoUrl = $this->storeProfileImage(
                $request->file('cover_photo_file'),
                $profile->cover_photo_url,
                'portfolio/cover',
            );
        }

        $profile->update([
            'page_title' => $validated['page_title'],
            'name' => $validated['name'],
            'username' => $validated['username'],
            'title' => $validated['title'],
            'location' => $validated['location'],
            'email' => $validated['email'],
            'availability' => $validated['availability'] ?? null,
            'bio' => $validated['bio'],
            'about_heading' => $validated['about_heading'],
            'about_summary' => $validated['about_summary'],
            'about_points' => $this->linesToArray($validated['about_points_text'] ?? null),
            'website_url' => $validated['website_url'] ?? null,
            'github_url' => $validated['github_url'] ?? null,
            'linkedin_url' => $validated['linkedin_url'] ?? null,
            'resume_url' => $validated['resume_url'] ?? null,
            'avatar_url' => $avatarUrl,
            'cover_photo_url' => $coverPhotoUrl,
        ]);

        return to_route('portfolio.edit');
    }

    /**
     * Store a new skill.
     */
    public function storeSkill(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $this->profile()->skills()->create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return to_route('portfolio.edit');
    }

    /**
     * Update a skill.
     */
    public function updateSkill(Request $request, Skill $skill): RedirectResponse
    {
        $this->assertOwnedByProfile($skill->profile_id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $skill->update([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return to_route('portfolio.edit');
    }

    /**
     * Delete a skill.
     */
    public function destroySkill(Skill $skill): RedirectResponse
    {
        $this->assertOwnedByProfile($skill->profile_id);
        $skill->delete();

        return to_route('portfolio.edit');
    }

    /**
     * Store a project.
     */
    public function storeProject(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'primary_language' => ['nullable', 'string', 'max:255'],
            'tech_stack_text' => ['nullable', 'string'],
            'source_url' => ['nullable', 'url', 'max:255'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'stars_count' => ['nullable', 'integer', 'min:0'],
            'forks_count' => ['nullable', 'integer', 'min:0'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable', 'boolean'],
        ]);

        $this->profile()->projects()->create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'primary_language' => $validated['primary_language'] ?? null,
            'tech_stack' => $this->linesToArray($validated['tech_stack_text'] ?? null),
            'source_url' => $validated['source_url'] ?? null,
            'live_url' => $validated['live_url'] ?? null,
            'stars_count' => $validated['stars_count'] ?? 0,
            'forks_count' => $validated['forks_count'] ?? 0,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_featured' => (bool) ($validated['is_featured'] ?? false),
        ]);

        return to_route('portfolio.edit');
    }

    /**
     * Update a project.
     */
    public function updateProject(Request $request, Project $project): RedirectResponse
    {
        $this->assertOwnedByProfile($project->profile_id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'primary_language' => ['nullable', 'string', 'max:255'],
            'tech_stack_text' => ['nullable', 'string'],
            'source_url' => ['nullable', 'url', 'max:255'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'stars_count' => ['nullable', 'integer', 'min:0'],
            'forks_count' => ['nullable', 'integer', 'min:0'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable', 'boolean'],
        ]);

        $project->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'primary_language' => $validated['primary_language'] ?? null,
            'tech_stack' => $this->linesToArray($validated['tech_stack_text'] ?? null),
            'source_url' => $validated['source_url'] ?? null,
            'live_url' => $validated['live_url'] ?? null,
            'stars_count' => $validated['stars_count'] ?? 0,
            'forks_count' => $validated['forks_count'] ?? 0,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_featured' => (bool) ($validated['is_featured'] ?? false),
        ]);

        return to_route('portfolio.edit');
    }

    /**
     * Delete a project.
     */
    public function destroyProject(Project $project): RedirectResponse
    {
        $this->assertOwnedByProfile($project->profile_id);
        $project->delete();

        return to_route('portfolio.edit');
    }

    /**
     * Store an experience item.
     */
    public function storeExperience(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'role' => ['required', 'string', 'max:255'],
            'organization' => ['required', 'string', 'max:255'],
            'period' => ['required', 'string', 'max:255'],
            'details' => ['required', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $this->profile()->experiences()->create([
            'role' => $validated['role'],
            'organization' => $validated['organization'],
            'period' => $validated['period'],
            'details' => $validated['details'],
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return to_route('portfolio.edit');
    }

    /**
     * Update an experience item.
     */
    public function updateExperience(Request $request, Experience $experience): RedirectResponse
    {
        $this->assertOwnedByProfile($experience->profile_id);

        $validated = $request->validate([
            'role' => ['required', 'string', 'max:255'],
            'organization' => ['required', 'string', 'max:255'],
            'period' => ['required', 'string', 'max:255'],
            'details' => ['required', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $experience->update([
            'role' => $validated['role'],
            'organization' => $validated['organization'],
            'period' => $validated['period'],
            'details' => $validated['details'],
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return to_route('portfolio.edit');
    }

    /**
     * Delete an experience item.
     */
    public function destroyExperience(Experience $experience): RedirectResponse
    {
        $this->assertOwnedByProfile($experience->profile_id);
        $experience->delete();

        return to_route('portfolio.edit');
    }

    /**
     * Store a focus item.
     */
    public function storeFocusItem(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'content' => ['required', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $this->profile()->focusItems()->create([
            'content' => $validated['content'],
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return to_route('portfolio.edit');
    }

    /**
     * Update a focus item.
     */
    public function updateFocusItem(Request $request, FocusItem $focusItem): RedirectResponse
    {
        $this->assertOwnedByProfile($focusItem->profile_id);

        $validated = $request->validate([
            'content' => ['required', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $focusItem->update([
            'content' => $validated['content'],
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return to_route('portfolio.edit');
    }

    /**
     * Delete a focus item.
     */
    public function destroyFocusItem(FocusItem $focusItem): RedirectResponse
    {
        $this->assertOwnedByProfile($focusItem->profile_id);
        $focusItem->delete();

        return to_route('portfolio.edit');
    }

    /**
     * Get the single portfolio profile.
     */
    private function profile(): Profile
    {
        return Profile::query()
            ->with(['skills', 'projects', 'experiences', 'focusItems'])
            ->firstOrFail();
    }

    /**
     * Assert the related item belongs to the active portfolio profile.
     */
    private function assertOwnedByProfile(int $profileId): void
    {
        abort_unless($this->profile()->id === $profileId, 404);
    }

    /**
     * Convert newline-delimited text into an array.
     *
     * @return array<int, string>
     */
    private function linesToArray(?string $value): array
    {
        if ($value === null || trim($value) === '') {
            return [];
        }

        return array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $value) ?: [])));
    }

    /**
     * Store an uploaded image and replace the previous local upload if needed.
     */
    private function storeProfileImage(
        UploadedFile $file,
        ?string $currentUrl,
        string $directory,
    ): string {
        $this->deleteLocalProfileImage($currentUrl);

        $path = $file->store($directory, 'public');

        return Storage::disk('public')->url($path);
    }

    /**
     * Delete a previous uploaded profile image when it belongs to local storage.
     */
    private function deleteLocalProfileImage(?string $url): void
    {
        if ($url === null || $url === '') {
            return;
        }

        $prefix = Storage::disk('public')->url('');

        if (! str_starts_with($url, $prefix)) {
            return;
        }

        $relativePath = ltrim(substr($url, strlen($prefix)), '/');

        if ($relativePath !== '') {
            Storage::disk('public')->delete($relativePath);
        }
    }
}
