<?php

use App\Mail\NewsletterMailable;
use App\Models\Campaign;
use App\Models\Newsletter;
use App\Models\Subscriber;
use App\Models\User;

it('stores campaign with overrides', function () {
    $user = User::factory()->create();
    $newsletter = Newsletter::factory()->for($user)->create();

    $subjectOverride = 'Override Subject';
    $contentOverride = '<p>Override Content</p>';

    $this->actingAs($user)
        ->post(route('newsletter.campaigns.store'), [
            'newsletter_id' => $newsletter->id,
            'subject' => $subjectOverride,
            'content' => $contentOverride,
            'scheduled_at' => null,
        ])
        ->assertRedirect(route('newsletter.campaigns.index'));

    $campaign = Campaign::first();
    expect($campaign->subject)->toBe($subjectOverride)
        ->and($campaign->content)->toBe($contentOverride);
});

it('uses overrides in NewsletterMailable', function () {
    $user = User::factory()->create();
    $newsletter = Newsletter::factory()->for($user)->create([
        'subject' => 'Original Subject',
        'content' => 'Original Content',
    ]);

    $subscriber = Subscriber::factory()->for($user)->create();

    $campaign = Campaign::factory()->for($user)->for($newsletter)->create([
        'subject' => 'Override Subject',
        'content' => 'Override Content',
    ]);

    $mailable = new NewsletterMailable($newsletter, $subscriber, $campaign);

    expect($mailable->envelope()->subject)->toBe('Override Subject');

    $content = $mailable->content();
    expect($content->with['content'])->toBe('Override Content');
});

it('falls back to newsletter values in NewsletterMailable when overrides are null', function () {
    $user = User::factory()->create();
    $newsletter = Newsletter::factory()->for($user)->create([
        'subject' => 'Original Subject',
        'content' => 'Original Content',
    ]);

    $subscriber = Subscriber::factory()->for($user)->create();

    $campaign = Campaign::factory()->for($user)->for($newsletter)->create([
        'subject' => null,
        'content' => null,
    ]);

    $mailable = new NewsletterMailable($newsletter, $subscriber, $campaign);

    expect($mailable->envelope()->subject)->toBe('Original Subject');

    $content = $mailable->content();
    expect($content->with['content'])->toBe('Original Content');
});
