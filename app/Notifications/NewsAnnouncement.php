<?php

namespace App\Notifications;

use App\Models\News;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewsAnnouncement extends Notification
{
    use Queueable;

    public function __construct(public News $news) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'news_announcement',
            'title' => 'New Club News: '.$this->news->title,
            'message' => $this->news->excerpt ?? substr(strip_tags($this->news->content), 0, 100).'...',
            'link' => route('news.index'),
            'icon' => 'newspaper',
        ];
    }
}
