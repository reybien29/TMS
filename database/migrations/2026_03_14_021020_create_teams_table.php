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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('abbreviation')->nullable();
            $table->string('logo')->nullable();
            $table->string('coach_name')->nullable();
            $table->string('coach_contact')->nullable();
            $table->string('team_type', 50)->default('competitive'); // competitive, recreational, youth
            $table->enum('age_group', ['u8', 'u10', 'u12', 'u14', 'u16', 'u18', 'adult'])->default('adult');
            $table->string('division')->nullable();
            $table->string('league')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->index(['team_type', 'age_group']);
            $table->index('league');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
