<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PortfolioAuthController extends Controller
{
    public function unlock(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'edit_key' => ['required', 'string'],
        ]);

        abort_if(
            ! hash_equals((string) env('PORTFOLIO_EDIT_KEY', ''), $validated['edit_key']),
            403,
            'Invalid edit key',
        );

        $request->session()->put('portfolio_edit_unlocked', true);

        return redirect()->back();
    }

    public function lock(Request $request): RedirectResponse
    {
        $request->session()->forget('portfolio_edit_unlocked');

        return redirect()->back();
    }
}
