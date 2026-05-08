<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RolePickerController extends Controller
{
    private const VALID_ROLES = ['guest', 'recruiter', 'developer'];

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'role' => ['required', 'string', 'in:guest,recruiter,developer'],
        ]);

        $request->session()->put('selected_role', $validated['role']);

        return redirect()->back();
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->forget('selected_role');

        return redirect()->back();
    }
}