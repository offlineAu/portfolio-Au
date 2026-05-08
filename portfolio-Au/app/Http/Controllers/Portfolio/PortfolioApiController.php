<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class PortfolioApiController extends Controller
{
    public function projects(): JsonResponse
    {
        $profile = $this->profile();

        $projects = $profile->projects->map(function (Project $project) {
            return [
                'name' => $project->name,
                'description' => $project->description,
                'primaryLanguage' => $project->primary_language,
                'tech' => $project->tech_stack ?? [],
                'sourceUrl' => $project->source_url,
                'liveUrl' => $project->live_url,
                'starsCount' => $project->stars_count,
                'forksCount' => $project->forks_count,
                'lastUpdated' => $project->updated_at?->toDateString(),
                'visibility' => 'public',
            ];
        });

        return response()->json($projects);
    }

    public function metrics(): JsonResponse
    {
        $profile = $this->profile();

        return response()->json([
            'followers' => $profile->projects->count() * 9,
            'following' => $profile->skills->count() * 3,
            'contributions' => ($profile->projects->count() * 28)
                + ($profile->experiences->count() * 17),
        ]);
    }

    private function profile(): Profile
    {
        return Profile::query()
            ->with(['skills', 'projects', 'experiences', 'focusItems'])
            ->firstOrFail();
    }
}
