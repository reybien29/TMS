<?php

namespace Database\Seeders;

use App\Enums\CampaignStatus;
use App\Enums\NewsletterStatus;
use App\Models\Campaign;
use App\Models\Metric;
use App\Models\Newsletter;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Database\Seeder;

class NewsletterSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
        ]);

        // Create Subscribers
        $subscribers = Subscriber::factory()->count(50)->create([
            'user_id' => $user->id,
        ]);

        // Create Newsletters
        $newsletter1 = Newsletter::create([
            'user_id' => $user->id,
            'title' => 'Welcome Newsletter',
            'subject' => 'Welcome to our platform!',
            'content' => '<h1>Welcome!</h1><p>We are glad to have you here.</p>',
            'status' => NewsletterStatus::Sent,
        ]);

        $newsletter2 = Newsletter::create([
            'user_id' => $user->id,
            'title' => 'Monthly Update - March',
            'subject' => 'What is new this month',
            'content' => '<h2>March Updates</h2><p>Here is what we have been working on...</p>',
            'status' => NewsletterStatus::Draft,
        ]);

        // Create a Campaign for newsletter 1
        $campaign = Campaign::create([
            'newsletter_id' => $newsletter1->id,
            'user_id' => $user->id,
            'scheduled_at' => now()->subDays(2),
            'sent_at' => now()->subDays(2),
            'status' => CampaignStatus::Completed,
        ]);

        // Create some metrics
        foreach ($subscribers->take(40) as $subscriber) {
            Metric::create([
                'campaign_id' => $campaign->id,
                'subscriber_id' => $subscriber->id,
                'type' => 'sent',
                'user_id' => $user->id,
                'occurred_at' => $campaign->sent_at,
            ]);

            if (rand(0, 1)) {
                Metric::create([
                    'campaign_id' => $campaign->id,
                    'subscriber_id' => $subscriber->id,
                    'type' => 'open',
                    'user_id' => $user->id,
                    'occurred_at' => $campaign->sent_at->addMinutes(rand(5, 60)),
                    'value' => ['ip' => '127.0.0.1'],
                ]);

                if (rand(0, 1)) {
                    Metric::create([
                        'campaign_id' => $campaign->id,
                        'subscriber_id' => $subscriber->id,
                        'type' => 'click',
                        'user_id' => $user->id,
                        'occurred_at' => $campaign->sent_at->addMinutes(rand(60, 120)),
                        'value' => ['ip' => '127.0.0.1', 'url' => 'https://example.com'],
                    ]);
                }
            }
        }
    }
}
