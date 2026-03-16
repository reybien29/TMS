<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    /**
     * Display a listing of teams.
     * Admins see all; users see only their own.
     */
    public function index()
    {
        $this->authorize('viewAny', Team::class);

        $query = Team::with(['players']);

        // Show all teams to everyone
        // if (! Auth::user()->isAdmin()) {
        //     $query->where('user_id', Auth::id());
        // }

        $teams = $query->latest()->paginate(10);

        return inertia('Teams/Index', [
            'teams' => $teams,
            'filters' => request()->only(['search', 'team_type']),
        ]);
    }

    /**
     * Show the form for creating a new team.
     */
    public function create()
    {
        $this->authorize('create', Team::class);

        return inertia('Teams/Create');
    }

    /**
     * Store a newly created team in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Team::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abbreviation' => 'nullable|string|max:10',
            'logo' => 'nullable|string|max:255',
            'coach_name' => 'nullable|string|max:255',
            'coach_contact' => 'nullable|string|max:255',
            'team_type' => 'nullable|string|max:50',
            'age_group' => 'nullable|in:u8,u10,u12,u14,u16,u18,adult',
            'division' => 'nullable|string|max:50',
            'league' => 'nullable|string|max:100',
        ]);

        $validated['user_id'] = Auth::id();

        Team::create($validated);

        return redirect()->route('teams.index')
            ->with('success', 'Team created successfully.');
    }

    /**
     * Display the specified team.
     */
    public function show(Team $team)
    {
        $this->authorize('view', $team);

        $team->load(['players', 'events', 'homeGames', 'awayGames']);

        return inertia('Teams/Show', [
            'team' => $team,
        ]);
    }

    /**
     * Show the form for editing the specified team.
     */
    public function edit(Team $team)
    {
        $this->authorize('update', $team);

        return inertia('Teams/Edit', [
            'team' => $team,
        ]);
    }

    /**
     * Update the specified team in storage.
     */
    public function update(Request $request, Team $team)
    {
        $this->authorize('update', $team);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abbreviation' => 'nullable|string|max:10',
            'logo' => 'nullable|string|max:255',
            'coach_name' => 'nullable|string|max:255',
            'coach_contact' => 'nullable|string|max:255',
            'team_type' => 'nullable|string|max:50',
            'age_group' => 'nullable|in:u8,u10,u12,u14,u16,u18,adult',
            'division' => 'nullable|string|max:50',
            'league' => 'nullable|string|max:100',
        ]);

        $team->update($validated);

        return redirect()->route('teams.index')
            ->with('success', 'Team updated successfully.');
    }

    /**
     * Remove the specified team from storage.
     */
    public function destroy(Team $team)
    {
        $this->authorize('delete', $team);

        $team->delete();

        return redirect()->route('teams.index')
            ->with('success', 'Team deleted successfully.');
    }
}
