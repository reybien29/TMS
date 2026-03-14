# Event Management System Cleanup TODO

## Approved Plan Implementation Steps

### 1. Delete Newsletter Models ✅
- app/Models/Newsletter.php
- app/Models/Campaign.php
- app/Models/Subscriber.php
- app/Models/Metric.php
- app/Models/CampaignRecipient.php

### 2. Delete Newsletter Enums ✅
- app/Enums/NewsletterStatus.php
- app/Enums/CampaignStatus.php

### 3. Delete Newsletter Controllers Directory ✅
- app/Http/Controllers/Newsletter/

### 4. Delete Other Backend Files ✅
**Policies:**
- app/Policies/NewsletterPolicy.php
- app/Policies/CampaignPolicy.php
- app/Policies/SubscriberPolicy.php

**Services/Jobs/Mail:**
- app/Services/MetricService.php
- app/Jobs/SendNewsletter.php
- app/Jobs/SendCampaignRecipient.php
- app/Mail/NewsletterMailable.php

**Factories:**
- database/factories/NewsletterFactory.php
- database/factories/CampaignFactory.php
- database/factories/SubscriberFactory.php

**Seeders:**
- database/seeders/NewsletterSeeder.php

**Migrations (creations only):**
- database/migrations/2026_03_12_124049_create_newsletters_table.php
- database/migrations/2026_03_12_124057_create_subscribers_table.php
- database/migrations/2026_03_12_124104_create_campaigns_table.php
- database/migrations/2026_03_12_124113_create_metrics_table.php
- database/migrations/2026_03_13_014405_create_campaign_recipients_table.php
- database/migrations/2026_03_13_054826_add_overrides_to_campaigns_table.php
- database/migrations/2026_03_13_064245_add_title_to_campaigns_table.php

### 5. Delete JS Newsletter Pages ✅
- resources/js/pages/Newsletter/

### 6. Delete Newsletter Tests ✅
- tests/Feature/Newsletter/

### 7. Delete Email View ✅
- resources/views/emails/newsletter.blade.php

### 8. Edit Files ✅
- app/Providers/AppServiceProvider.php: Remove Newsletter policies
- database/seeders/DatabaseSeeder.php: Remove NewsletterSeeder call
- resources/js/Layouts/AuthenticatedLayout.jsx: Remove nav links

### 9. Followup - Migrations & Seeding ✅
- php artisan migrate: Nothing to migrate
- php artisan db:seed: Test user exists (non-blocking)

### 10. Test ✅
- php artisan test: [results below]
- php artisan serve: Ready
- Event Management fully functional, Newsletter completely removed
