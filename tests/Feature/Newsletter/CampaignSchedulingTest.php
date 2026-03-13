<?php

use App\Jobs\SendNewsletter;
use App\Models\Newsletter;
use App\Models\User;
use Illuminate\Support\Facades\Queue;

it('dispatches send job immediately when scheduled_at is null', function () {
    Queue::fake();

    $user = User::factory()->create();
    $newsletter = Newsletter::factory()->for($user)->create();

    $this->actingAs($user)
        ->post(route('newsletter.campaigns.store'), [
            'newsletter_id' => $newsletter->id,
            'scheduled_at' => null,
        ])
        ->assertRedirect();

    Queue::assertPushed(SendNewsletter::class);
});

it('dispatches send job with delay when scheduled_at is future', function () {
    Queue::fake();

    $user = User::factory()->create();
    $newsletter = Newsletter::factory()->for($user)->create();
    $scheduledAt = now()->addHour();

    $this->actingAs($user)
        ->post(route('newsletter.campaigns.store'), [
            'newsletter_id' => $newsletter->id,
            'scheduled_at' => $scheduledAt->toDateTimeString(),
        ])
        ->assertRedirect();

    Queue::assertPushed(SendNewsletter::class, function (SendNewsletter $job) use ($scheduledAt) {
        if (! $job->delay instanceof DateTimeInterface) {
            return false;
        }

        return $job->delay->getTimestamp() === $scheduledAt->getTimestamp();
    });
});
