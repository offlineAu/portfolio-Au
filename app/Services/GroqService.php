<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class GroqService
{
    private string $apiKey;
    private string $baseUrl = 'https://api.groq.com/openai/v1';
    private string $model   = 'llama3-8b-8192'; // fast + free tier

    public function __construct()
    {
        $this->apiKey = config('services.groq.key');
    }

    public function chat(array $messages, int $maxTokens = 256): Response
    {
        return Http::withHeaders([
            'Authorization' => "Bearer {$this->apiKey}",
            'Content-Type'  => 'application/json',
        ])->post("{$this->baseUrl}/chat/completions", [
            'model'       => $this->model,
            'messages'    => $messages,
            'max_tokens'  => $maxTokens,
            'temperature' => 0.1, // low temp = consistent JSON output
        ]);
    }
}