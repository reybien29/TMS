<?php

namespace Database\Factories;

use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Schedule>
 */
class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => $this->faker->numberBetween(1, 10),
            'home_team_id' => $this->faker->numberBetween(1, 10),
            'away_team_id' => $this->faker->numberBetween(1, 10),
            'game_time' => $this->faker->dateTimeBetween('now', '+1 month'),
            'location' => $this->faker->address,
            'referee' => $this->faker->name,
            'score_home' => $this->faker->numberBetween(0, 100),
            'score_away' => $this->faker->numberBetween(0, 100),
            'game_status' => $this->faker->randomElement(['scheduled', 'in_progress', 'completed', 'postponed', 'cancelled']),
            'notes' => $this->faker->sentence,
            'user_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
