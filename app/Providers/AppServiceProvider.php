<?php

namespace App\Providers;

use App\Models\Activity;
use App\Models\Event;
use App\Models\Player;
use App\Models\Registration;
use App\Models\Schedule;
use App\Models\Team;
use App\Models\Ticket;
use App\Models\User;
use App\Models\Venue;
use App\Policies\ActivityPolicy;
use App\Policies\EventPolicy;
use App\Policies\PlayerPolicy;
use App\Policies\RegistrationPolicy;
use App\Policies\SchedulePolicy;
use App\Policies\TeamPolicy;
use App\Policies\TicketPolicy;
use App\Policies\UserPolicy;
use App\Policies\VenuePolicy;
use App\Services\AuditLogService;
use Illuminate\Auth\Events\Login;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Vite;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The model-to-policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Event::class => EventPolicy::class,
        Venue::class => VenuePolicy::class,
        Team::class => TeamPolicy::class,
        Player::class => PlayerPolicy::class,
        Registration::class => RegistrationPolicy::class,
        Ticket::class => TicketPolicy::class,
        Schedule::class => SchedulePolicy::class,
        User::class => UserPolicy::class,
        Activity::class => ActivityPolicy::class,
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

        \Illuminate\Support\Facades\Event::listen(
            Login::class,
            function ($event) {
                AuditLogService::log('login', null, null, 'User logged in successfully');
            }
        );
    }
}
