<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Team;
use App\Models\Venue;
use App\Services\AuditLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     * Admins see all events; regular users see only their own.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Event::class);

        $query = Event::with(['venue', 'team', 'opponentTeam'])
            ->withCount('registrations');

        if ($request->has('search')) {
            $query->where('title', 'like', '%'.$request->search.'%')
                ->orWhere('description', 'like', '%'.$request->search.'%');
        }

        if ($request->has('event_type')) {
            $query->where('event_type', $request->event_type);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('start_date')) {
            $query->whereDate('start_time', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->whereDate('start_time', '<=', $request->end_date);
        }

        $events = $query->latest('start_time')->paginate(12);

        return inertia('Events/Index', [
            'events' => $events,
            'filters' => $request->only(['search', 'event_type', 'status', 'start_date', 'end_date']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Event::class);

        // Admins see all venues/teams; users see only their own.
        $venues = Auth::user()->isAdmin()
            ? Venue::all()
            : Venue::where('user_id', Auth::id())->get();

        $teams = Auth::user()->isAdmin()
            ? Team::all()
            : Team::where('user_id', Auth::id())->get();

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
        $this->authorize('create', Event::class);

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

        // Ensure non-admins can only attach venues/teams they own.
        if (! Auth::user()->isAdmin()) {
            $venueOwnedByUser = Venue::where('id', $validated['venue_id'])
                ->where('user_id', Auth::id())
                ->exists();

            if (! $venueOwnedByUser) {
                abort(403, 'You do not own the selected venue.');
            }

            if (! empty($validated['team_id'])) {
                $teamOwnedByUser = Team::where('id', $validated['team_id'])
                    ->where('user_id', Auth::id())
                    ->exists();

                if (! $teamOwnedByUser) {
                    abort(403, 'You do not own the selected team.');
                }
            }
        }

        $validated['user_id'] = Auth::id();

        $event = Event::create($validated);

        AuditLogService::log('created', Event::class, $event->id, ['title' => $event->title]);

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

        $venues = Auth::user()->isAdmin()
            ? Venue::all()
            : Venue::where('user_id', Auth::id())->get();

        $teams = Auth::user()->isAdmin()
            ? Team::all()
            : Team::where('user_id', Auth::id())->get();

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

        AuditLogService::log('updated', Event::class, $event->id, ['changes' => $event->getChanges()]);

        return redirect()->route('events.index')
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $this->authorize('delete', $event);

        $eventTitle = $event->title;
        $eventId = $event->id;
        $event->delete();

        AuditLogService::log('deleted', Event::class, $eventId, ['title' => $eventTitle]);

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }
}
