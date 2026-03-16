<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use App\Services\AuditLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VenueController extends Controller
{
    /**
     * Display a listing of venues.
     * Admins see all; users see only their own.
     */
    public function index()
    {
        $this->authorize('viewAny', Venue::class);

        $query = Venue::query();

        // Show all venues to everyone
        // if (! Auth::user()->isAdmin()) {
        //     $query->where('user_id', Auth::id());
        // }

        $venues = $query->latest()->paginate(10);

        return inertia('Venues/Index', [
            'venues' => $venues,
            'filters' => request()->only(['search', 'city', 'is_public']),
        ]);
    }

    /**
     * Show the form for creating a new venue.
     */
    public function create()
    {
        $this->authorize('create', Venue::class);

        return inertia('Venues/Create');
    }

    /**
     * Store a newly created venue in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Venue::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'required|string|max:100',
            'capacity' => 'nullable|integer|min:1',
            'facilities' => 'nullable|string',
            'contact_phone' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'hourly_rate' => 'required|numeric|min:0',
            'is_public' => 'boolean',
        ]);

        $validated['user_id'] = Auth::id();

        $venue = Venue::create($validated);

        AuditLogService::log('created', Venue::class, $venue->id, ['name' => $venue->name]);

        return redirect()->route('venues.index')
            ->with('success', 'Venue created successfully.');
    }

    /**
     * Display the specified venue.
     */
    public function show(Venue $venue)
    {
        $this->authorize('view', $venue);

        $venue->load(['events']);

        return inertia('Venues/Show', [
            'venue' => $venue,
        ]);
    }

    /**
     * Show the form for editing the specified venue.
     */
    public function edit(Venue $venue)
    {
        $this->authorize('update', $venue);

        return inertia('Venues/Edit', [
            'venue' => $venue,
        ]);
    }

    /**
     * Update the specified venue in storage.
     */
    public function update(Request $request, Venue $venue)
    {
        $this->authorize('update', $venue);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'required|string|max:100',
            'capacity' => 'nullable|integer|min:1',
            'facilities' => 'nullable|string',
            'contact_phone' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'hourly_rate' => 'required|numeric|min:0',
            'is_public' => 'boolean',
        ]);

        $venue->update($validated);

        AuditLogService::log('updated', Venue::class, $venue->id, ['changes' => $venue->getChanges()]);

        return redirect()->route('venues.index')
            ->with('success', 'Venue updated successfully.');
    }

    /**
     * Remove the specified venue from storage.
     */
    public function destroy(Venue $venue)
    {
        $this->authorize('delete', $venue);

        $venueName = $venue->name;
        $venueId = $venue->id;
        $venue->delete();

        AuditLogService::log('deleted', Venue::class, $venueId, ['name' => $venueName]);

        return redirect()->route('venues.index')
            ->with('success', 'Venue deleted successfully.');
    }
}
