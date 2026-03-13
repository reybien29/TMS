<?php

namespace App\Http\Controllers\Newsletter;

use App\Http\Controllers\Controller;
use App\Http\Requests\Newsletter\StoreSubscriberRequest;
use App\Models\Metric;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    public function index()
    {
        $subscribers = Subscriber::where('user_id', auth()->id())
            ->withCount('metrics')
            ->latest()
            ->paginate(10);

        return Inertia::render('Newsletter/Subscriber/Index', [
            'subscribers' => $subscribers,
        ]);
    }

    public function create()
    {
        return Inertia::render('Newsletter/Subscriber/Create');
    }

    public function store(StoreSubscriberRequest $request)
    {
        $subscriber = Subscriber::create([
            'email' => $request->email,
            'name' => $request->name,
            'subscribed_at' => now(),
            'status' => 'active',
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('newsletter.subscribers.index')->with('success', 'Subscriber added successfully.');
    }

    public function show(Subscriber $subscriber)
    {
        $this->authorize('view', $subscriber);

        $subscriber->load(['metrics' => function ($query) {
            $query->latest()->limit(10);
        }]);

        return Inertia::render('Newsletter/Subscriber/Show', [
            'subscriber' => $subscriber,
        ]);
    }

    public function edit(Subscriber $subscriber)
    {
        $this->authorize('update', $subscriber);

        return Inertia::render('Newsletter/Subscriber/Edit', [
            'subscriber' => $subscriber,
        ]);
    }

    public function update(StoreSubscriberRequest $request, Subscriber $subscriber)
    {
        $this->authorize('update', $subscriber);

        $subscriber->update([
            'email' => $request->email,
            'name' => $request->name,
        ]);

        return redirect()->route('newsletter.subscribers.index')->with('success', 'Subscriber updated successfully.');
    }

    public function destroy(Subscriber $subscriber)
    {
        $this->authorize('delete', $subscriber);

        $subscriber->update([
            'unsubscribed_at' => now(),
            'status' => 'unsubscribed',
        ]);

        return redirect()->route('newsletter.subscribers.index')->with('success', 'Subscriber unsubscribed successfully.');
    }

    public function unsubscribe(Request $request, Subscriber $subscriber)
    {
        if ($subscriber->status !== 'unsubscribed') {
            $subscriber->update([
                'unsubscribed_at' => now(),
                'status' => 'unsubscribed',
            ]);

            Metric::create([
                'campaign_id' => null,
                'subscriber_id' => $subscriber->id,
                'type' => 'unsubscribe',
                'user_id' => $subscriber->user_id,
                'occurred_at' => now(),
                'value' => [
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                ],
            ]);
        }

        return redirect('/')->with('success', 'You have been unsubscribed.');
    }
}
