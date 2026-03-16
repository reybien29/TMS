<?php

namespace App\Notifications;

use App\Models\Due;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DueDateAlert extends Notification
{
    use Queueable;

    public function __construct(public Due $due) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'due_alert',
            'title' => 'Membership Due Alert',
            'message' => 'Your contribution of $'.$this->due->amount.' is due by '.$this->due->due_date->format('M j, Y'),
            'link' => route('dues.index'),
            'icon' => 'credit-card',
        ];
    }
}
