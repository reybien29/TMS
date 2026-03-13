<?php

namespace App\Enums;

enum NewsletterStatus: string
{
    case Draft = 'draft';
    case Published = 'published';
    case Scheduled = 'scheduled';
    case Sent = 'sent';
    case Failed = 'failed';
}
