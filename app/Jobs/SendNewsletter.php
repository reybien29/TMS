<?php

namespace App\Jobs;

use App\Enums\CampaignStatus;
use App\Enums\NewsletterStatus;
use App\Models\Campaign;
use App\Models\CampaignRecipient;
use App\Models\Subscriber;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendNewsletter implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Campaign $campaign)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $campaign = $this->campaign;
        $newsletter = $campaign->newsletter;
        $user = $campaign->user;

        if ($campaign->status !== CampaignStatus::Sending) {
            $campaign->update(['status' => CampaignStatus::Sending]);
        }

        Subscriber::where('user_id', $user->id)
            ->where('status', 'active')
            ->select(['id'])
            ->chunk(100, function ($subscribers) use ($campaign) {
                foreach ($subscribers as $subscriber) {
                    $recipient = CampaignRecipient::firstOrCreate([
                        'campaign_id' => $campaign->id,
                        'subscriber_id' => $subscriber->id,
                    ], [
                        'status' => 'queued',
                    ]);

                    if ($recipient->status !== 'sent') {
                        SendCampaignRecipient::dispatch($recipient->id);
                    }
                }
            });

        $newsletter->update([
            'status' => $campaign->scheduled_at ? NewsletterStatus::Scheduled : $newsletter->status,
        ]);
    }
}
