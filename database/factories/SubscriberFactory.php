<?php

namespace Database\Factories;

use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriberFactory extends Factory
{
    protected $model = Subscriber::class;

    public function definition(): array
    {
        return [
            'email' => $this->faker->unique()->safeEmail(),
            'name' => $this->faker->name(),
            'subscribed_at' => now(),
            'status' => 'active',
            'user_id' => User::factory(),
        ];
    }
}
