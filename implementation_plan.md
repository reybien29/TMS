# Implementation Plan

## Overview
Develop a Newsletter Management Platform integrated into the existing Laravel 12 + Inertia.js/React 18 + TailwindCSS application (TMS), enabling users to manage subscribers, compose newsletters, schedule campaigns via queues, and view engagement metrics, leveraging the auth system, PostgreSQL DB, and mail/queue configs for a seamless addition.

The platform fits as an extension of the current dashboard-driven app, adding dedicated routes, models, controllers, React pages/components, migrations, and jobs while preserving the Breeze scaffolding and Vite build process. This maintains the SPA experience with server-side rendering support.

Key decisions: Use Laravel queues for scheduling (database driver ready), Log mailer initially (configurable to SMTP), PostgreSQL DB (env set), Eloquent relationships for subscribers/newsletters/campaigns/metrics, React hooks/context for frontend state, Ziggy for route handling.

## Types
Define comprehensive Eloquent models with relationships, enums, and DTOs for type safety.

**Enums (new):**
```php
// app/Enums/NewsletterStatus.php
enum NewsletterStatus: string {
    case Draft = 'draft';
    case Published = 'published';
    case Scheduled = 'scheduled';
    case Sent = 'sent';
    case Failed = 'failed';
}

// app/Enums/CampaignStatus.php
enum CampaignStatus: string {
    case Pending = 'pending';
    case Sending = 'sending';
    case Completed = 'completed';
    case Failed = 'failed';
}
```

**Models (new with full specs):**
- `app/Models/Subscriber.php`: id (bigIncrements), email (string unique not null), name (string nullable), subscribed_at (timestamp), unsubscribed_at (timestamp nullable), user_id (foreignId references users), status (enum: active|inactive|unsubscribed). Indexes: email unique, user_id. Relationships: belongsTo User, morphMany Metric.
- `app/Models/Newsletter.php`: id, title (string), subject (string), content (longText), status (NewsletterStatus enum), user_id (foreignId), created_at/updated_at. Relationships: belongsTo User, hasMany Campaigns.
- `app/Models/Campaign.php`: id, newsletter_id (foreignId), scheduled_at (timestamp nullable), sent_at (timestamp nullable), status (CampaignStatus enum), user_id (foreignId). Relationships: belongsTo Newsletter/User, hasMany Metrics.
- `app/Models/Metric.php`: id, campaign_id/subscriber_id (foreignId nullable polymorphic), type (enum: open, click, unsubscribe), value (json nullable), occurred_at (timestamp). Relationships: morphTo Campaign/Subscriber, belongsTo User via campaign.

Validation rules via FormRequests: email required|email|unique:subscribers, etc.

## Files
Create new feature-structured directories and files, no deletions, minimal config tweaks.

**New files/directories:**
- `app/Models/{Subscriber,Newsletter,Campaign,Metric}.php` (Eloquent models as above)
- `app/Enums/{NewsletterStatus,CampaignStatus}.php`
- `app/Http/Controllers/Newsletter/{SubscriberController,NewsletterController,CampaignController,MetricController}.php` (CRUD with Inertia responses, auth middleware)
- `app/Http/Requests/Newsletter/{StoreSubscriberRequest, etc.}.php` (validation)
- `app/Jobs/SendNewsletter.php` (queue job: build Mailable, dispatch to subscribers)
- `app/Mail/NewsletterMailable.php` (Mailable with dynamic content)
- `database/migrations/{2024_11_01_000000_create_newsletters_table.php, _create_subscribers_table.php, _create_campaigns_table.php, _create_metrics_table.php}` (schema as models imply)
- `resources/js/Pages/Newsletter/{Index.jsx, Subscribers/Index.jsx, Newsletters/Compose.jsx, Campaigns/Schedule.jsx, Analytics.jsx}` (Inertia pages)
- `resources/js/Components/Newsletter/{SubscriberForm.jsx, NewsletterEditor.jsx (TinyMCE/RichText), CampaignScheduler.jsx, MetricsChart.jsx (Recharts)}`
- `routes/web.php` (add prefix newsletter routes)

**Existing files to modify:**
- `routes/web.php`: Add Route::middleware('auth')->prefix('newsletter')->group(...)
- `app/Models/User.php`: Add HasFactory relation: hasMany(Newsletter::class), hasMany(Subscriber::class)
- `database/seeders/DatabaseSeeder.php`: Add NewsletterSeeder call
- `config/mail.php`: No change (log default), document SMTP setup
- `package.json`: Add dev deps recharts@^2.12, react-quill@^2.0 (for editor), @tinymce/tinymce-react@^6.0
- `resources/js/app.jsx`: No change

**Config updates:** None major; queue/mail ready.

## Functions
Add CRUD operations aligned with RESTful controllers using Inertia redirects.

**New functions (signatures/purpose):**
- NewsletterController@index(Request $request): Response - Paginate user's newsletters
- NewsletterController@store(StoreNewsletterRequest $request): RedirectResponse - Create draft
- NewsletterController@update(UpdateNewsletterRequest $request, Newsletter $newsletter): RedirectResponse
- CampaignController@store(StoreCampaignRequest $request): RedirectResponse - Schedule via SendNewsletter::dispatchAfter()
- SendNewsletter@handle(Newsletter $newsletter): void - Build Mailable, loop subscribers, queue/track metrics (mock opens/clicks)
- MetricController@index(Campaign $campaign): JsonResponse - Aggregate opens/clicks/unsubs JSON for charts

**Modified functions:** None initially; extend User scopeIfOwner trait if added.

**Removed:** None.

## Classes
Introduce feature-complete classes following Laravel conventions.

**New classes:**
- NewsletterController (extends Controller, file app/Http/Controllers/Newsletter/NewsletterController.php): index, create, store, show, edit, update, destroy methods with policies.
- SendNewsletter (implements ShouldQueue, file app/Jobs/SendNewsletter.php): constructor(Newsletter $newsletter), handle() dispatches mail + metrics.
- NewsletterMailable (extends Mailable, file app/Mail/NewsletterMailable.php): build() with HTML view, embeds content.
- NewsletterEditor (React.FC, file resources/js/Components/Newsletter/NewsletterEditor.jsx): Rich text editor with preview.

**Modified classes:**
- User (add relationships: public function newsletters() { return $this->hasMany(Newsletter::class); })
- DatabaseSeeder (add NewsletterSeeder::class)

**Removed:** None.

## Dependencies
Add frontend libs for editor/charts; backend uses built-in (no new Composer reqs).

**New packages:**
- `npm i recharts@^2.12.0 react-quill@^2.0.2 @tinymce/tinymce-react@^6.0.0` (then npm run build)
No PHP deps (uses Laravel Mail/Queue/Jobs).

Version pins match ecosystem.

## Testing
PestPHP tests mirroring existing Feature/ structure.

**New test files:**
- `tests/Feature/Newsletter/SubscriberTest.php`: test auth user can CRUD subscribers (uses RefreshDatabase)
- `tests/Feature/Newsletter/CampaignTest.php`: test scheduling, job dispatch, mail mock
- `tests/Feature/Newsletter/MetricTest.php`: test tracking aggregation

**Validation:** Mock Mail::fake(), Queue::fake(), assertSeeInOrder for Inertia, Database factories for seeding.

Run `php artisan test --filter Newsletter` post-implementation.

## Implementation Order
Implement in dependency order: DB → Backend → Jobs/Mail → Frontend → Seeding/Tests.

1. Create Enums/Models/Migrations → `php artisan migrate`
2. Add User relationships → test basic relations
3. Controllers/Requests → wire basic routes
4. Jobs/Mailable → test queue dispatch
5. React Pages/Components → `npm i && npm run dev`
6. Routes → manual test /newsletter
7. Seeder/Tests → `php artisan db:seed`, run tests
8. Polish: Policies for auth, Charts data, Rich editor

