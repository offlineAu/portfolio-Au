<?php

namespace App\Services;

use App\Models\Experience;
use App\Models\FocusItem;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;

class ProfileDataService
{
    /**
     * Transform the profile model into the public page contract.
     *
     * @return array<string, mixed>
     */
    public function toPageProfile(Profile $profile): array
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
            'facebookUrl' => $profile->facebook_url,
            'resumeUrl' => $profile->resume_url,
            'githubAvatarUrl' => $profile->github_avatar_url,
            'facebookAvatarUrl' => $profile->facebook_avatar_url,
            'facebookCoverPhotoUrl' => $profile->facebook_cover_photo_url,
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
    public function toDetailLines(mixed $details): array
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
}
