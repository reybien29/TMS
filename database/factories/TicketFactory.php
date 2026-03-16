<?php

namespace Database\Factories;

use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Ticket>
 */
class TicketFactory extends Factory
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
            'ticket_type' => $this->faker->randomElement(['general', 'vip', 'premium']),
            'price' => $this->faker->randomFloat(2, 10, 100),
            'quantity_available' => $this->faker->numberBetween(10, 100),
            'user_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
