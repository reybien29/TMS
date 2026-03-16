<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Player;
use App\Models\Registration;
use App\Models\Schedule;
use App\Models\Team;
use App\Models\Ticket;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the admin user created by AdminSeeder
        $admin = User::where('email', 'admin@example.com')->first();
        $user = User::where('email', 'user@example.com')->first();

        // Create venues
        $venues = Venue::factory()->count(5)->create([
            'user_id' => $admin->id,
        ]);

        // Create teams
        $teams = Team::factory()->count(8)->create([
            'user_id' => $admin->id,
        ]);

        // Create events
        $events = Event::factory()->count(3)->create([
            'user_id' => $admin->id,
            'venue_id' => $venues->random()->id,
            'team_id' => $teams->random()->id,
            'opponent_team_id' => $teams->random()->id,
        ]);

        // Create players for teams
        foreach ($teams as $team) {
            Player::factory()->count(10)->create([
                'team_id' => $team->id,
                'user_id' => $admin->id,
            ]);
        }

        // Create schedules
        foreach ($events as $event) {
            // Create unique schedules for this event
            $scheduleCount = 0;
            Schedule::factory()
                ->count(6)
                ->create([
                    'event_id' => $event->id,
                    'user_id' => $admin->id,
                ]);
        }

        // Create registrations and tickets for events
        foreach ($events as $event) {
            // Create registrations for this event
            $players = Player::where('user_id', $admin->id)->inRandomOrder()->limit(20)->get();
            foreach ($players as $player) {
                $registration = Registration::create([
                    'event_id' => $event->id,
                    'player_id' => $player->id,
                    'registration_type' => fake()->randomElement(['player', 'spectator', 'vip', 'staff']),
                    'payment_status' => fake()->randomElement(['pending', 'paid', 'failed', 'refunded']),
                    'payment_amount' => fake()->randomFloat(2, 0, 50),
                    'payment_method' => fake()->randomElement(['cash', 'card', 'online']),
                    'transaction_id' => fake()->uuid,
                    'payment_date' => fake()->dateTimeBetween('-1 month', 'now'),
                    'notes' => fake()->sentence,
                    'user_id' => $admin->id,
                ]);

                // Create ticket for this registration
                Ticket::create([
                    'registration_id' => $registration->id,
                    'qr_code' => fake()->uuid,
                    'status' => fake()->randomElement(['active', 'used', 'cancelled']),
                    'seat_number' => fake()->numberBetween(1, 100),
                    'section' => fake()->randomElement(['A', 'B', 'C', 'D']),
                    'user_id' => $admin->id,
                ]);
            }
        }

        // Create some data for the regular user too
        $userVenues = Venue::factory()->count(3)->create([
            'user_id' => $user->id,
        ]);

        $userTeams = Team::factory()->count(4)->create([
            'user_id' => $user->id,
        ]);

        $userEvents = Event::factory()->count(2)->create([
            'user_id' => $user->id,
            'venue_id' => $userVenues->random()->id,
            'team_id' => $userTeams->random()->id,
            'opponent_team_id' => $userTeams->random()->id,
        ]);

        foreach ($userTeams as $team) {
            Player::factory()->count(8)->create([
                'team_id' => $team->id,
                'user_id' => $user->id,
            ]);
        }

        foreach ($userEvents as $event) {
            Schedule::factory()->count(4)->create([
                'event_id' => $event->id,
                'user_id' => $user->id,
            ]);

            // Create registrations and tickets for user events
            $userPlayers = Player::where('user_id', $user->id)->inRandomOrder()->limit(15)->get();
            foreach ($userPlayers as $player) {
                $registration = Registration::create([
                    'event_id' => $event->id,
                    'player_id' => $player->id,
                    'registration_type' => fake()->randomElement(['player', 'spectator', 'vip', 'staff']),
                    'payment_status' => fake()->randomElement(['pending', 'paid', 'failed', 'refunded']),
                    'payment_amount' => fake()->randomFloat(2, 0, 50),
                    'payment_method' => fake()->randomElement(['cash', 'card', 'online']),
                    'transaction_id' => fake()->uuid,
                    'payment_date' => fake()->dateTimeBetween('-1 month', 'now'),
                    'notes' => fake()->sentence,
                    'user_id' => $user->id,
                ]);

                Ticket::create([
                    'registration_id' => $registration->id,
                    'qr_code' => fake()->uuid,
                    'status' => fake()->randomElement(['active', 'used', 'cancelled']),
                    'seat_number' => fake()->numberBetween(1, 100),
                    'section' => fake()->randomElement(['A', 'B', 'C', 'D']),
                    'user_id' => $user->id,
                ]);
            }
        }

        $this->command->info('Test data created successfully!');
    }
}
