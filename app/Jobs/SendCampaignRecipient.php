<?php

namespace App\Jobs;

use App\Enums\CampaignStatus;
use App\Enums\NewsletterStatus;
use App\Mail\NewsletterMailable;
use App\Models\CampaignRecipient;
use App\Models\Metric;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendCampaignRecipient implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $campaignRecipientId)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $recipient = CampaignRecipient::query()
            ->with(['campaign.newsletter', 'campaign.user', 'subscriber'])
            ->findOrFail($this->campaignRecipientId);

        if ($recipient->status === 'sent') {
            return;
        }

        $campaign = $recipient->campaign;
        $newsletter = $campaign->newsletter;
        $user = $campaign->user;
        $subscriber = $recipient->subscriber;

        try {
            Mail::to($subscriber->email)->send(new NewsletterMailable($newsletter, $subscriber, $campaign));

            Metric::firstOrCreate([
                'campaign_id' => $campaign->id,
                'subscriber_id' => $subscriber->id,
                'type' => 'sent',
                'user_id' => $user->id,
            ], [
                'occurred_at' => now(),
            ]);

            $recipient->update([
                'status' => 'sent',
                'sent_at' => now(),
                'failed_at' => null,
                'failure_message' => null,
            ]);
        } catch (Throwable $e) {
            $recipient->update([
                'status' => 'failed',
                'failed_at' => now(),
                'failure_message' => $e->getMessage(),
            ]);

            throw $e;
        }

        $remainingCount = CampaignRecipient::query()
            ->where('campaign_id', $campaign->id)
            ->where('status', 'queued')
            ->count();

        if ($remainingCount > 0) {
            return;
        }

        $failedCount = CampaignRecipient::query()
            ->where('campaign_id', $campaign->id)
            ->where('status', 'failed')
            ->count();

        if ($failedCount > 0) {
            $campaign->update(['status' => CampaignStatus::Failed]);

            return;
        }

        $campaign->update([
            'status' => CampaignStatus::Completed,
            'sent_at' => now(),
        ]);

        $newsletter->update(['status' => NewsletterStatus::Sent]);
    }
}
