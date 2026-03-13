<?php

namespace Database\Factories;

use App\Enums\NewsletterStatus;
use App\Models\Newsletter;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsletterFactory extends Factory
{
    protected $model = Newsletter::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'subject' => $this->faker->sentence(),
            'content' => $this->faker->paragraphs(3, true),
            'status' => NewsletterStatus::Draft,
            'user_id' => User::factory(),
        ];
    }
}
