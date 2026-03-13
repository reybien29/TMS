<?php

namespace Database\Factories;

use App\Enums\CampaignStatus;
use App\Models\Campaign;
use App\Models\Newsletter;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    public function definition(): array
    {
        return [
            'newsletter_id' => Newsletter::factory(),
            'user_id' => User::factory(),
            'status' => CampaignStatus::Pending,
            'scheduled_at' => now()->addDay(),
        ];
    }
}
