<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use App\Services\GroqService;
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

    public function sentiment(Request $request, GroqService $groq): JsonResponse
    {
        $request->validate([
            'text' => 'required|string|max:500',
        ]);

        $prompt = "Analyze the sentiment of this text: \"{$request->text}\"\n\n"
                . "Respond with ONLY valid JSON, no markdown, no explanation:\n"
                . "{\n"
                . "  \"score\": <float between -1 and 1>,\n"
                . "  \"label\": \"<Negative|Neutral|Positive>\",\n"
                . "  \"confidence\": <integer 0-100>,\n"
                . "  \"word\": \"<single most emotionally charged word, or empty string>\"\n"
                . "}";

        $response = $groq->chat([
            ['role' => 'system', 'content' => 'You are a sentiment analysis engine. Always respond with valid JSON only. No prose, no markdown.'],
            ['role' => 'user',   'content' => $prompt],
        ]);

        if (!$response->successful()) {
            return response()->json(['error' => 'Analysis failed'], 502);
        }

        // Groq returns OpenAI-compatible structure:
        // $response->json('choices.0.message.content')
        $raw   = $response->json('choices.0.message.content') ?? '';
        $clean = trim(preg_replace('/```json|```/', '', $raw));

        $parsed = json_decode($clean, true);

        if (!$parsed) {
            return response()->json(['error' => 'Parse failed'], 500);
        }

        return response()->json($parsed);
    }
}
