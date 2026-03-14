<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories.Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company.' Basketball Team',
            'abbreviation' => strtoupper($this->faker->lexify('???')),
            'logo' => $this->faker->imageUrl(200, 200, 'sports'),
            'coach_name' => $this->faker->name,
            'coach_contact' => $this->faker->phoneNumber,
            'team_type' => $this->faker->randomElement(['Youth', 'Adult', 'Professional', 'Recreational']),
            'age_group' => $this->faker->randomElement(['u8', 'u10', 'u12', 'u14', 'u16', 'u18', 'adult']),
            'division' => $this->faker->randomElement(['A', 'B', 'C', 'D']),
            'league' => $this->faker->randomElement(['City League', 'County League', 'Regional League', 'State League']),
            'user_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
