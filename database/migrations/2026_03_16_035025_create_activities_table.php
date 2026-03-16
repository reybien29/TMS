<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function run(): void
    {
        Schema::create('activities', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->foreignId('user_id')->constrained()->cascadeOnDelete();
            $blueprint->string('action'); // e.g. 'created', 'updated', 'deleted'
            $blueprint->string('model_type')->nullable(); // e.g. 'App\Models\Event'
            $blueprint->unsignedBigInteger('model_id')->nullable();
            $blueprint->text('details')->nullable(); // JSON or string of changes
            $blueprint->string('ip_address')->nullable();
            $blueprint->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
