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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('home_team_id')->constrained('teams')->onDelete('cascade');
            $table->foreignId('away_team_id')->constrained('teams')->onDelete('cascade');
            $table->timestamp('game_time');
            $table->string('location')->nullable();
            $table->string('referee')->nullable();
            $table->string('score_home')->default('0');
            $table->string('score_away')->default('0');
            $table->enum('game_status', ['scheduled', 'in_progress', 'completed', 'postponed', 'cancelled'])->default('scheduled');
            $table->text('notes')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['event_id', 'home_team_id', 'away_team_id']);
            $table->index(['game_time', 'game_status']);
            $table->index(['home_team_id', 'away_team_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
