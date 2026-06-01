<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RolePickerController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'role'        => ['required', 'string', 'in:guest,recruiter,developer'],
            'redirect_to' => ['nullable', 'string', 'in:home,portfolio'],
        ]);

        $request->session()->put('selected_role', $validated['role']);

        if (($validated['redirect_to'] ?? 'portfolio') === 'portfolio') {
            // Recruiters get their own dedicated page
            if ($validated['role'] === 'recruiter') {
                return redirect()->route('portfolio.recruiter');
            }

            return redirect()->route('portfolio.full');
        }

        return redirect()->back();
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->forget('selected_role');
        return redirect()->back();
    }
}