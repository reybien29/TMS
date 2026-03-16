<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class EventReminder extends Notification
{
    use Queueable;

    public function __construct(public Event $event) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'event_reminder',
            'title' => 'Upcoming Event: '.$this->event->title,
            'message' => 'Reminder for '.$this->event->title.' starting at '.$this->event->start_time->format('M j, Y H:i'),
            'link' => route('events.show', $this->event->id),
            'icon' => 'calendar',
        ];
    }
}
