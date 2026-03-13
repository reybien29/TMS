<?php

namespace App\Mail;

use App\Models\Campaign;
use App\Models\Newsletter;
use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class NewsletterMailable extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public Newsletter $newsletter,
        public Subscriber $subscriber,
        public Campaign $campaign
    ) {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->campaign->subject ?? $this->newsletter->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.newsletter',
            with: [
                'content' => $this->campaign->content ?? $this->newsletter->content,
                'subscriber' => $this->subscriber,
                'campaign' => $this->campaign,
                'trackingPixel' => route('newsletter.track', ['campaign' => $this->campaign->id, 'type' => 'open', 'subscriber_id' => $this->subscriber->id]),
                'unsubscribeUrl' => URL::signedRoute('newsletter.subscribers.unsubscribe', ['subscriber' => $this->subscriber->id]),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
