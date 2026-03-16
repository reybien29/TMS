<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Schedule;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    /**
     * Display a listing of schedules.
     * Admins see all; users see only their own.
     */
    public function index(Request $request)
    {
        // Public access - no authorization for viewAll, show all schedules
        $query = Schedule::with(['event', 'homeTeam', 'awayTeam']);

        // Optional: Filter by logged-in user if auth
        if (Auth::check() && ! Auth::user()->isAdmin()) {
            $query->where('user_id', Auth::id());
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->whereHas('homeTeam', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhereHas('awayTeam', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhereHas('event', function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%");
                })->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($request->filled('game_status')) {
            $query->where('game_status', $request->input('game_status'));
        }

        $schedules = $query->latest('game_time')->paginate(10);

        return inertia('Schedules/Index', [
            'schedules' => $schedules,
            'filters' => $request->only(['search', 'game_status']),
        ]);
    }

    /**
     * Show the form for creating a new schedule.
     */
    public function create()
    {
        $this->authorize('create', Schedule::class);

        $events = Auth::user()->isAdmin()
            ? Event::all()
            : Event::where('user_id', Auth::id())->get();

        $teams = Auth::user()->isAdmin()
            ? Team::all()
            : Team::where('user_id', Auth::id())->get();

        return inertia('Schedules/Create', [
            'events' => $events,
            'teams' => $teams,
        ]);
    }

    /**
     * Store a newly created schedule in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Schedule::class);

        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'home_team_id' => 'required|exists:teams,id',
            'away_team_id' => 'required|exists:teams,id|different:home_team_id',
            'game_time' => 'required|date',
            'location' => 'nullable|string|max:255',
            'referee' => 'nullable|string|max:255',
            'score_home' => 'nullable|string|max:10',
            'score_away' => 'nullable|string|max:10',
            'game_status' => 'required|in:scheduled,in_progress,completed,postponed,cancelled',
            'notes' => 'nullable|string',
        ]);

        // Ensure non-admins can only schedule games for events they own.
        if (! Auth::user()->isAdmin()) {
            $eventOwned = Event::where('id', $validated['event_id'])
                ->where('user_id', Auth::id())
                ->exists();

            if (! $eventOwned) {
                abort(403, 'You do not own the selected event.');
            }
        }

        $validated['user_id'] = Auth::id();

        Schedule::create($validated);

        return redirect()->route('schedules.index')
            ->with('success', 'Schedule created successfully.');
    }

    /**
     * Display the specified schedule.
     */
    public function show(Schedule $schedule)
    {
        $this->authorize('view', $schedule);

        $schedule->load(['event', 'homeTeam', 'awayTeam']);

        return inertia('Schedules/Show', [
            'schedule' => $schedule,
        ]);
    }

    /**
     * Show the form for editing the specified schedule.
     */
    public function edit(Schedule $schedule)
    {
        $this->authorize('update', $schedule);

        $events = Auth::user()->isAdmin()
            ? Event::all()
            : Event::where('user_id', Auth::id())->get();

        $teams = Auth::user()->isAdmin()
            ? Team::all()
            : Team::where('user_id', Auth::id())->get();

        return inertia('Schedules/Edit', [
            'schedule' => $schedule,
            'events' => $events,
            'teams' => $teams,
        ]);
    }

    /**
     * Update the specified schedule in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        $this->authorize('update', $schedule);

        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'home_team_id' => 'required|exists:teams,id',
            'away_team_id' => 'required|exists:teams,id|different:home_team_id',
            'game_time' => 'required|date',
            'location' => 'nullable|string|max:255',
            'referee' => 'nullable|string|max:255',
            'score_home' => 'nullable|string|max:10',
            'score_away' => 'nullable|string|max:10',
            'game_status' => 'required|in:scheduled,in_progress,completed,postponed,cancelled',
            'notes' => 'nullable|string',
        ]);

        $schedule->update($validated);

        return redirect()->route('schedules.index')
            ->with('success', 'Schedule updated successfully.');
    }

    /**
     * Remove the specified schedule from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $this->authorize('delete', $schedule);

        $schedule->delete();

        return redirect()->route('schedules.index')
            ->with('success', 'Schedule deleted successfully.');
    }
}
