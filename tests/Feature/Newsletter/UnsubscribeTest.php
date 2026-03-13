<?php

use App\Models\Subscriber;
use Illuminate\Support\Facades\URL;

it('unsubscribes via signed link without auth', function () {
    $subscriber = Subscriber::factory()->create([
        'status' => 'active',
        'unsubscribed_at' => null,
    ]);

    $signedUrl = URL::signedRoute('newsletter.subscribers.unsubscribe', ['subscriber' => $subscriber->id]);

    $this->get($signedUrl)->assertRedirect('/');

    expect($subscriber->refresh()->status)->toBe('unsubscribed');
    expect($subscriber->unsubscribed_at)->not->toBeNull();
});

it('rejects unsubscribe when signature is missing', function () {
    $subscriber = Subscriber::factory()->create();

    $this->get(route('newsletter.subscribers.unsubscribe', ['subscriber' => $subscriber->id], absolute: false))
        ->assertForbidden();
});
