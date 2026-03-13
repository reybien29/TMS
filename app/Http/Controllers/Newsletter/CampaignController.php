<?php

namespace App\Http\Controllers\Newsletter;

use App\Enums\CampaignStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Newsletter\StoreCampaignRequest;
use App\Jobs\SendNewsletter;
use App\Models\Campaign;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    public function index()
    {
        $campaigns = Campaign::where('user_id', auth()->id())
            ->with('newsletter')
            ->latest()
            ->paginate(10);

        $newsletters = Newsletter::where('user_id', auth()->id())
            ->get(['id', 'title']);

        return Inertia::render('Newsletter/Campaign/Index', [
            'campaigns' => $campaigns,
            'newsletters' => $newsletters,
        ]);
    }

    public function create(Request $request)
    {
        $newsletterId = $request->query('newsletter_id');

        $newsletter = Newsletter::where('user_id', auth()->id())->find($newsletterId);

        if (!$newsletter) {
            $userNewsletters = Newsletter::where('user_id', auth()->id())->count();
            if ($userNewsletters === 0) {
                return redirect()->route('newsletter.index')->with('error', 'Please create a newsletter first.');
            }
            // Use first newsletter as default
            $newsletter = Newsletter::where('user_id', auth()->id())->first();
        }

        return Inertia::render('Newsletter/Campaign/Create', [
            'newsletter' => $newsletter,
        ]);
    }

    public function store(StoreCampaignRequest $request)
    {
        $campaign = Campaign::create([
            'newsletter_id' => $request->newsletter_id,
            'subject' => $request->subject,
            'content' => $request->content,
            'scheduled_at' => $request->scheduled_at,
            'status' => CampaignStatus::Pending,
            'user_id' => auth()->id(),
        ]);

        if ($request->scheduled_at) {
            SendNewsletter::dispatch($campaign)->delay(now()->parse($request->scheduled_at));
        } else {
            SendNewsletter::dispatch($campaign);
        }

        return redirect()->route('newsletter.campaigns.index')->with('success', 'Campaign created successfully.');
    }

    public function show(Campaign $campaign)
    {
        $this->authorize('view', $campaign);

        $campaign->load(['newsletter', 'metrics' => function ($query) {
            $query->latest()->limit(50);
        }]);

        return Inertia::render('Newsletter/Campaign/Show', [
            'campaign' => $campaign,
        ]);
    }

    public function edit(Campaign $campaign)
    {
        $this->authorize('update', $campaign);

        return Inertia::render('Newsletter/Campaign/Edit', [
            'campaign' => $campaign,
        ]);
    }

    public function update(Request $request, Campaign $campaign)
    {
        $this->authorize('update', $campaign);

        $request->validate([
            'scheduled_at' => 'nullable|date',
        ]);

        $campaign->update([
            'scheduled_at' => $request->scheduled_at,
        ]);

        return redirect()->route('newsletter.campaigns.index')->with('success', 'Campaign updated successfully.');
    }

    public function destroy(Campaign $campaign)
    {
        $this->authorize('delete', $campaign);

        $campaign->delete();

        return redirect()->route('newsletter.campaigns.index')->with('success', 'Campaign deleted successfully.');
    }
}
