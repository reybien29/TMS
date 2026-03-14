<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Team;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with(['venue', 'team', 'opponentTeam'])
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return inertia('Events/Index', [
            'events' => $events,
            'filters' => request()->only(['search', 'event_type', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $venues = Venue::where('user_id', Auth::id())->get();
        $teams = Team::where('user_id', Auth::id())->get();

        return inertia('Events/Create', [
            'venues' => $venues,
            'teams' => $teams,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_type' => 'required|in:game,practice,tournament,meeting,training',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'status' => 'required|in:scheduled,in_progress,completed,cancelled',
            'venue_id' => 'required|exists:venues,id',
            'team_id' => 'nullable|exists:teams,id',
            'opponent_team_id' => 'nullable|exists:teams,id',
            'max_participants' => 'nullable|integer|min:1',
            'registration_fee' => 'required|numeric|min:0',
            'event_code' => 'nullable|string|unique:events,event_code',
        ]);

        $validated['user_id'] = Auth::id();

        Event::create($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $this->authorize('view', $event);

        $event->load(['venue', 'team', 'opponentTeam', 'registrations.player', 'schedule']);

        return inertia('Events/Show', [
            'event' => $event,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        $this->authorize('update', $event);

        $venues = Venue::where('user_id', Auth::id())->get();
        $teams = Team::where('user_id', Auth::id())->get();

        return inertia('Events/Edit', [
            'event' => $event,
            'venues' => $venues,
            'teams' => $teams,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $this->authorize('update', $event);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_type' => 'required|in:game,practice,tournament,meeting,training',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'status' => 'required|in:scheduled,in_progress,completed,cancelled',
            'venue_id' => 'required|exists:venues,id',
            'team_id' => 'nullable|exists:teams,id',
            'opponent_team_id' => 'nullable|exists:teams,id',
            'max_participants' => 'nullable|integer|min:1',
            'registration_fee' => 'required|numeric|min:0',
            'event_code' => 'nullable|string|unique:events,event_code,'.$event->id,
        ]);

        $event->update($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $this->authorize('delete', $event);

        $event->delete();

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }
}
