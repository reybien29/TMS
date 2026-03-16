<?php

namespace Database\Seeders;

use App\Models\Due;
use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdminExtraDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin', 'email' => 'admin@hoophub.com']);
        $users = User::where('role', 'user')->limit(10)->get();

        if ($users->isEmpty()) {
            $users = User::factory()->count(5)->create();
        }

        // Seed Dues
        foreach ($users as $user) {
            Due::create([
                'user_id' => $user->id,
                'amount' => fake()->randomFloat(2, 50, 200),
                'due_date' => now()->addDays(fake()->numberBetween(-30, 30)),
                'status' => fake()->randomElement(['pending', 'paid', 'overdue']),
                'description' => 'Season Membership Fee 2025',
                'paid_at' => fake()->boolean(60) ? now()->subDays(rand(1, 10)) : null,
            ]);
        }

        // Seed News
        $newsTitles = [
            'Season Opening Tournament Announced',
            'New Training Facility at West Side Courts',
            'Volunteer Coaches Meeting Next Tuesday',
            'HoopHub Platform Migration Complete',
            'Youth League Registrations Now Open',
        ];

        foreach ($newsTitles as $title) {
            News::create([
                'user_id' => $admin->id,
                'title' => $title,
                'content' => fake()->paragraphs(3, true),
                'is_published' => true,
                'published_at' => now()->subDays(rand(0, 30)),
            ]);
        }
    }
}
