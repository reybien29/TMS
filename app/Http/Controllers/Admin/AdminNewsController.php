<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\User;
use App\Notifications\NewsAnnouncement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class AdminNewsController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'boolean',
        ]);

        $news = News::create([
            ...$validated,
            'user_id' => Auth::id(),
            'published_at' => $validated['is_published'] ? now() : null,
        ]);

        if ($news->is_published) {
            // Notify all users about the new news
            Notification::send(User::all(), new NewsAnnouncement($news));
        }

        return back()->with('success', 'News created and announced!');
    }
}
