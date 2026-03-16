<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Player;
use App\Models\Registration;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::where('user_id', Auth::id())->latest()->paginate(10);

        return inertia('Registrations/Index', [
            'registrations' => $registrations,
        ]);
    }

    public function create(Request $request)
    {
        $events = Event::all();
        $teams = Team::all();
        $players = Player::where('user_id', Auth::id())->get();

        return inertia('Registrations/Create', [
            'events' => $events,
            'teams' => $teams,
            'players' => $players,
            'event_id' => $request->query('event_id'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'player_id' => 'required|exists:players,id',
            'team_id' => 'required|exists:teams,id',
            'payment_status' => 'required|in:pending,paid,refunded',
            'payment_amount' => 'required|numeric|min:0',
        ]);

        $event = Event::withCount('registrations')->findOrFail($validated['event_id']);

        if ($event->max_participants && $event->registrations_count >= $event->max_participants) {
            return back()->withErrors(['event_id' => 'This event is already at full capacity.']);
        }

        $validated['user_id'] = Auth::id();

        Registration::create($validated);

        return redirect()->route('registrations.index')
            ->with('success', 'Registration created successfully.');
    }

    public function show(Registration $registration)
    {
        $this->authorize('view', $registration);

        $registration->load(['event', 'player', 'team']);

        return inertia('Registrations/Show', [
            'registration' => $registration,
        ]);
    }

    public function edit(Registration $registration)
    {
        $this->authorize('update', $registration);

        $events = Event::all();
        $teams = Team::all();
        $players = Player::where('user_id', Auth::id())->get();

        return inertia('Registrations/Edit', [
            'registration' => $registration,
            'events' => $events,
            'teams' => $teams,
            'players' => $players,
        ]);
    }

    public function update(Request $request, Registration $registration)
    {
        $this->authorize('update', $registration);

        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'player_id' => 'required|exists:players,id',
            'team_id' => 'required|exists:teams,id',
            'payment_status' => 'required|in:pending,paid,refunded',
            'payment_amount' => 'required|numeric|min:0',
        ]);

        $registration->update($validated);

        return redirect()->route('registrations.index')
            ->with('success', 'Registration updated successfully.');
    }

    public function destroy(Registration $registration)
    {
        $this->authorize('delete', $registration);

        $registration->delete();

        return redirect()->route('registrations.index')
            ->with('success', 'Registration deleted successfully.');
    }
}
