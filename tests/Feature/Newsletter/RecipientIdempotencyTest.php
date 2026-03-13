<?php

use App\Enums\CampaignStatus;
use App\Jobs\SendCampaignRecipient;
use App\Jobs\SendNewsletter;
use App\Mail\NewsletterMailable;
use App\Models\Campaign;
use App\Models\CampaignRecipient;
use App\Models\Newsletter;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;

it('creates one campaign_recipient per subscriber (idempotent)', function () {
    Queue::fake();

    $user = User::factory()->create();
    $newsletter = Newsletter::factory()->for($user)->create();
    $campaign = Campaign::factory()->for($newsletter)->for($user)->create([
        'status' => CampaignStatus::Sending,
        'scheduled_at' => null,
    ]);

    $subscribers = Subscriber::factory()->count(3)->for($user)->create([
        'status' => 'active',
    ]);

    (new SendNewsletter($campaign))->handle();
    (new SendNewsletter($campaign))->handle();

    expect(CampaignRecipient::query()->where('campaign_id', $campaign->id)->count())->toBe(3);

    Queue::assertPushed(SendCampaignRecipient::class, 6);
});

it('does not send email twice for the same campaign_recipient', function () {
    Mail::fake();

    $user = User::factory()->create();
    $newsletter = Newsletter::factory()->for($user)->create();
    $campaign = Campaign::factory()->for($newsletter)->for($user)->create([
        'status' => CampaignStatus::Sending,
        'scheduled_at' => null,
    ]);
    $subscriber = Subscriber::factory()->for($user)->create([
        'status' => 'active',
    ]);

    $recipient = CampaignRecipient::create([
        'campaign_id' => $campaign->id,
        'subscriber_id' => $subscriber->id,
        'status' => 'queued',
    ]);

    (new SendCampaignRecipient($recipient->id))->handle();
    (new SendCampaignRecipient($recipient->id))->handle();

    Mail::assertSent(NewsletterMailable::class, 1);
});
