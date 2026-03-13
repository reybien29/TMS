<?php

namespace App\Enums;

enum CampaignStatus: string
{
    case Pending = 'pending';
    case Sending = 'sending';
    case Completed = 'completed';
    case Failed = 'failed';
}
