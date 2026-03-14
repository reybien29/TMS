<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories.Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph,
            'event_type' => $this->faker->randomElement(['game', 'practice', 'tournament', 'meeting', 'training']),
            'start_time' => now()->addDays($this->faker->numberBetween(1, 30)),
            'end_time' => now()->addDays($this->faker->numberBetween(1, 30))->addHours(2),
            'status' => $this->faker->randomElement(['scheduled', 'in_progress', 'completed', 'cancelled']),
            'venue_id' => $this->faker->numberBetween(1, 10),
            'team_id' => $this->faker->numberBetween(1, 10),
            'opponent_team_id' => $this->faker->numberBetween(1, 10),
            'max_participants' => $this->faker->numberBetween(5, 50),
            'registration_fee' => $this->faker->randomFloat(2, 0, 50),
            'event_code' => $this->faker->unique()->lexify('EVENT-????'),
            'user_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
