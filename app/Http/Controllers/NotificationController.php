<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return response()->json([
            'data' => $user->notifications()->limit(10)->get(),
            'unread_count' => $user->unreadNotifications()->count(),
        ]);
    }

    public function markAsRead($id)
    {
        Auth::user()->notifications()->findOrFail($id)->markAsRead();

        return back();
    }

    public function markAllAsRead()
    {
        Auth::user()->unreadNotifications->markAsRead();

        return back();
    }

    public function destroy($id)
    {
        Auth::user()->notifications()->findOrFail($id)->delete();

        return back();
    }
}
