<?php

namespace App\Http\Controllers;

use App\Models\Due;
use App\Models\Event;
use App\Models\News;
use App\Models\Registration;
use App\Models\Team;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        if ($user->isAdmin()) {
            $stats = [
                'total_users' => User::count(),
                'total_events' => Event::count(),
                'total_teams' => Team::count(),
                'total_venues' => Venue::count(),
                'total_registrations' => Registration::count(),
                'total_dues' => Due::where('status', 'paid')->sum('amount'),
                'recent_events' => Event::with(['user', 'venue', 'team'])->latest()->limit(10)->get(),
                'recent_registrations' => Registration::with(['event', 'user', 'player'])->latest()->limit(10)->get(),
                'latest_news' => News::with('user')->where('is_published', true)->latest()->limit(5)->get(),
                'overdue_dues_count' => Due::where('status', 'overdue')->count(),
            ];

            return Inertia::render('Admin/Dashboard', $stats);
        }

        // Member (User) specific dashboard
        $stats = [
            'my_registrations_count' => Registration::where('user_id', $user->id)->count(),
            'my_dues_balance' => Due::where('user_id', $user->id)->where('status', '!=', 'paid')->sum('amount'),
            'upcoming_events' => Event::with(['venue', 'team'])
                ->where('start_time', '>', now())
                ->where('status', 'scheduled')
                ->latest()
                ->limit(5)
                ->get(),
            'my_recent_registrations' => Registration::with(['event', 'team'])
                ->where('user_id', $user->id)
                ->latest()
                ->limit(5)
                ->get(),
            'latest_news' => News::where('is_published', true)->latest()->limit(3)->get(),
        ];

        return Inertia::render('Dashboard', $stats);
    }
}
