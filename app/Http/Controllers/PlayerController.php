<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlayerController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Player::class);

        $query = Player::query();

        if (! Auth::user()->isAdmin()) {
            $query->where('user_id', Auth::id());
        }

        $players = $query->with(['team'])->latest()->paginate(10);

        return inertia('Players/Index', [
            'players' => $players,
            'filters' => request()->only(['search', 'position']),
        ]);
    }

    public function create()
    {
        $teams = Team::where('user_id', Auth::id())->get();

        return inertia('Players/Create', [
            'teams' => $teams,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'date_of_birth' => 'required|date',
            'position' => 'nullable|string|max:50',
            'jersey_number' => 'nullable|string|max:10',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'team_id' => 'required|exists:teams,id',
        ]);

        $validated['user_id'] = Auth::id();

        Player::create($validated);

        return redirect()->route('players.index')
            ->with('success', 'Player created successfully.');
    }

    public function show(Player $player)
    {
        $this->authorize('view', $player);

        $player->load(['team']);

        return inertia('Players/Show', [
            'player' => $player,
        ]);
    }

    public function edit(Player $player)
    {
        $this->authorize('update', $player);

        $teams = Team::where('user_id', Auth::id())->get();

        return inertia('Players/Edit', [
            'player' => $player,
            'teams' => $teams,
        ]);
    }

    public function update(Request $request, Player $player)
    {
        $this->authorize('update', $player);

        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'date_of_birth' => 'required|date',
            'position' => 'nullable|string|max:50',
            'jersey_number' => 'nullable|string|max:10',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'team_id' => 'required|exists:teams,id',
        ]);

        $player->update($validated);

        return redirect()->route('players.index')
            ->with('success', 'Player updated successfully.');
    }

    public function destroy(Player $player)
    {
        $this->authorize('delete', $player);

        $player->delete();

        return redirect()->route('players.index')
            ->with('success', 'Player deleted successfully.');
    }
}
