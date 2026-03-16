<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display a listing of the news.
     */
    public function index(Request $request): Response
    {
        $query = News::with('user')->where('is_published', true);

        if ($request->has('search')) {
            $query->where('title', 'like', '%'.$request->search.'%');
        }

        return Inertia::render('News/Index', [
            'news' => $query->latest()->paginate(10),
            'filters' => $request->only(['search']),
        ]);
    }
}
