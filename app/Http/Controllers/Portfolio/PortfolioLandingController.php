<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use App\Services\ProfileDataService;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioLandingController extends Controller
{
    public function __construct(
        private readonly ProfileDataService $profileData,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Portfolio/Landing', [
            'isLanding' => true,
        ]);
    }

    public function portfolio(): Response
    {
        return Inertia::render('Portfolio/Landing', [
            'isLanding' => false,
        ]);
    }

    public function recruiter(): Response
    {
        return Inertia::render('Portfolio/Recruiter');
    }
}
