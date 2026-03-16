<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Due;
use App\Models\Event;
use App\Models\News;
use App\Models\Registration;
use App\Models\Team;
use App\Models\User;
use App\Models\Venue;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_users' => User::count(),
            'total_events' => Event::count(),
            'total_teams' => Team::count(),
            'total_venues' => Venue::count(),
            'total_registrations' => Registration::count(),
            'total_dues' => Due::where('status', 'paid')->sum('amount'), // Added
            'recent_events' => Event::with(['user', 'venue', 'team'])->latest()->limit(10)->get(),
            'recent_registrations' => Registration::with(['event', 'user', 'player'])->latest()->limit(10)->get(),
            'latest_news' => News::with('user')->where('is_published', true)->latest()->limit(5)->get(), // Added
            'overdue_dues_count' => Due::where('status', 'overdue')->count(), // Added
        ];

        return Inertia::render('Admin/Dashboard', $stats);
    }
}
