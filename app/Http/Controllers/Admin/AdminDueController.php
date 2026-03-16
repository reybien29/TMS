<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Due;
use App\Models\User;
use App\Notifications\DueDateAlert;
use Illuminate\Http\Request;

class AdminDueController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'status' => 'required|in:pending,overdue,paid',
        ]);

        $due = Due::create($validated);

        // Notify user about their new due
        $user = User::findOrFail($validated['user_id']);
        $user->notify(new DueDateAlert($due));

        return back()->with('success', 'Due created and member notified!');
    }
}
