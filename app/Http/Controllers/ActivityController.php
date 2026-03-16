<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    /**
     * Display a listing of activities for admins.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Activity::class);

        $activities = Activity::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/AuditLogs/Index', [
            'activities' => $activities,
        ]);
    }
}
