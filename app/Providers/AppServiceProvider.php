<?php

namespace App\Providers;

use App\Models\Campaign;
use App\Models\Newsletter;
use App\Models\Subscriber;
use App\Policies\CampaignPolicy;
use App\Policies\NewsletterPolicy;
use App\Policies\SubscriberPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Vite;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Newsletter::class => NewsletterPolicy::class,
        Subscriber::class => SubscriberPolicy::class,
        Campaign::class => CampaignPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        $this->registerPolicies();
    }
}
