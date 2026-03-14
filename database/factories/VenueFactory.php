<?php

namespace Database\Factories;

use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Venue>
 */
class VenueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company.' Basketball Court',
            'address' => $this->faker->address,
            'city' => $this->faker->city,
            'state' => $this->faker->state,
            'country' => $this->faker->country,
            'capacity' => $this->faker->numberBetween(50, 500),
            'facilities' => 'Locker rooms, Scoreboard, Concessions',
            'contact_phone' => $this->faker->phoneNumber,
            'contact_email' => $this->faker->email,
            'hourly_rate' => $this->faker->randomFloat(2, 25, 100),
            'is_public' => $this->faker->boolean,
            'user_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
