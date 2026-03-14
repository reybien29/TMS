<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('event_type', ['game', 'practice', 'tournament', 'meeting', 'training'])->default('game');
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled'])->default('scheduled');
            $table->foreignId('venue_id')->constrained()->onDelete('cascade');
            $table->foreignId('team_id')->nullable()->constrained('teams')->onDelete('set null');
            $table->foreignId('opponent_team_id')->nullable()->constrained('teams')->onDelete('set null');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('max_participants')->nullable();
            $table->decimal('registration_fee', 8, 2)->default(0);
            $table->string('event_code')->unique()->nullable();
            $table->timestamps();

            $table->index(['start_time', 'event_type']);
            $table->index(['team_id', 'opponent_team_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
