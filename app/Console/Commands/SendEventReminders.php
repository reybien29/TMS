<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Models\User;
use App\Notifications\EventReminder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class SendEventReminders extends Command
{
    protected $signature = 'app:send-event-reminders';

    protected $description = 'Send reminders for upcoming events';

    public function handle()
    {
        // Get events starting in the next 24 hours
        $events = Event::where('start_time', '>', now())
            ->where('start_time', '<=', now()->addDay())
            ->where('status', 'scheduled')
            ->get();

        foreach ($events as $event) {
            // Find users registered for this event
            $users = User::whereHas('registrations', function ($q) use ($event) {
                $q->where('event_id', $event->id);
            })->get();

            if ($users->isNotEmpty()) {
                Notification::send($users, new EventReminder($event));
                $this->info('Sent reminders for event: '.$event->title);
            }
        }
    }
}
