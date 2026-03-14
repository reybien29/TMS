<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop newsletter-related tables
        Schema::dropIfExists('campaign_recipients');
        Schema::dropIfExists('metrics');
        Schema::dropIfExists('campaigns');
        Schema::dropIfExists('subscribers');
        Schema::dropIfExists('newsletters');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Note: We won't restore the newsletter tables in rollback
        // as this is a destructive transformation
    }
};
