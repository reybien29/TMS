<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\Team;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_event()
    {
        $user = User::factory()->create();
        $venue = Venue::factory()->create(['user_id' => $user->id]);
        $team = Team::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->post('/events', [
            'title' => 'Basketball Game',
            'description' => 'Weekly basketball game',
            'event_type' => 'game',
            'start_time' => now()->addHour(),
            'end_time' => now()->addHours(2),
            'status' => 'scheduled',
            'venue_id' => $venue->id,
            'team_id' => $team->id,
            'registration_fee' => 10.00,
        ]);

        $response->assertRedirect('/events');
        $this->assertDatabaseHas('events', [
            'title' => 'Basketball Game',
            'user_id' => $user->id,
            'venue_id' => $venue->id,
            'team_id' => $team->id,
        ]);
    }

    public function test_user_can_view_events()
    {
        $user = User::factory()->create();
        $venue = Venue::factory()->create(['user_id' => $user->id]);
        $team = Team::factory()->create(['user_id' => $user->id]);

        Event::create([
            'title' => 'Test Event',
            'description' => 'Test event description',
            'event_type' => 'game',
            'start_time' => now()->addHour(),
            'end_time' => now()->addHours(2),
            'status' => 'scheduled',
            'venue_id' => $venue->id,
            'team_id' => $team->id,
            'user_id' => $user->id,
            'registration_fee' => 10.00,
        ]);

        $response = $this->actingAs($user)->get('/events');

        $response->assertStatus(200);
        $response->assertSee('Test Event');
    }

    public function test_user_can_view_event_details()
    {
        $user = User::factory()->create();
        $venue = Venue::factory()->create(['user_id' => $user->id]);
        $team = Team::factory()->create(['user_id' => $user->id]);

        $event = Event::create([
            'title' => 'Test Event',
            'description' => 'Test event description',
            'event_type' => 'game',
            'start_time' => now()->addHour(),
            'end_time' => now()->addHours(2),
            'status' => 'scheduled',
            'venue_id' => $venue->id,
            'team_id' => $team->id,
            'user_id' => $user->id,
            'registration_fee' => 10.00,
        ]);

        $response = $this->actingAs($user)->get("/events/{$event->id}");

        $response->assertStatus(200);
        $response->assertSee('Test Event');
    }

    public function test_user_can_update_event()
    {
        $user = User::factory()->create();
        $venue = Venue::factory()->create(['user_id' => $user->id]);
        $team = Team::factory()->create(['user_id' => $user->id]);

        $event = Event::create([
            'title' => 'Original Title',
            'description' => 'Original description',
            'event_type' => 'game',
            'start_time' => now()->addHour(),
            'end_time' => now()->addHours(2),
            'status' => 'scheduled',
            'venue_id' => $venue->id,
            'team_id' => $team->id,
            'user_id' => $user->id,
            'registration_fee' => 10.00,
        ]);

        $response = $this->actingAs($user)->put("/events/{$event->id}", [
            'title' => 'Updated Title',
            'description' => 'Updated description',
            'event_type' => 'practice',
            'start_time' => now()->addHour(),
            'end_time' => now()->addHours(2),
            'status' => 'in_progress',
            'venue_id' => $venue->id,
            'team_id' => $team->id,
            'registration_fee' => 15.00,
        ]);

        $response->assertRedirect('/events');
        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'title' => 'Updated Title',
            'description' => 'Updated description',
        ]);
    }

    public function test_user_can_delete_event()
    {
        $user = User::factory()->create();
        $venue = Venue::factory()->create(['user_id' => $user->id]);
        $team = Team::factory()->create(['user_id' => $user->id]);

        $event = Event::create([
            'title' => 'Event to Delete',
            'description' => 'Event to be deleted',
            'event_type' => 'game',
            'start_time' => now()->addHour(),
            'end_time' => now()->addHours(2),
            'status' => 'scheduled',
            'venue_id' => $venue->id,
            'team_id' => $team->id,
            'user_id' => $user->id,
            'registration_fee' => 10.00,
        ]);

        $response = $this->actingAs($user)->delete("/events/{$event->id}");

        $response->assertRedirect('/events');
        $this->assertDatabaseMissing('events', [
            'id' => $event->id,
        ]);
    }
}
