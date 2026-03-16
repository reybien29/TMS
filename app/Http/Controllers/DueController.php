<?php

namespace App\Http\Controllers;

use App\Models\Due;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DueController extends Controller
{
    /**
     * Display a listing of the dues.
     */
    public function index(Request $request): Response
    {
        $query = Due::with('user');

        if (! Auth::user()->isAdmin()) {
            $query->where('user_id', Auth::id());
        }

        if ($request->has('search')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->search.'%');
            });
        }

        return Inertia::render('Dues/Index', [
            'dues' => $query->latest()->paginate(10),
            'filters' => $request->only(['search']),
        ]);
    }
}
