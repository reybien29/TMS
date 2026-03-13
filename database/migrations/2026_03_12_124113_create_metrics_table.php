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
        Schema::create('metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('subscriber_id')->nullable()->constrained()->onDelete('cascade');
            $table->enum('type', ['sent', 'open', 'click', 'unsubscribe'])->default('sent');
            $table->json('value')->nullable();
            $table->timestamp('occurred_at');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->index(['campaign_id', 'subscriber_id', 'type']);
            $table->index(['subscriber_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('metrics');
    }
};
