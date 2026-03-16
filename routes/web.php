<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DueController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VenueController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── Public welcome page ───────────────────────────────────────────────────────
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'canResetPassword' => Route::has('password.request'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ── Authenticated routes ──────────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ── Resources accessible by both Admin and User ───────────────────────────
    // Policy-based ownership filtering is applied inside each controller.

    // Events
    Route::prefix('events')->name('events.')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index');
        Route::get('/create', [EventController::class, 'create'])->name('create');
        Route::post('/', [EventController::class, 'store'])->name('store');
        Route::get('/{event}', [EventController::class, 'show'])->name('show')->whereNumber('event');
        Route::get('/{event}/edit', [EventController::class, 'edit'])->name('edit')->whereNumber('event');
        Route::put('/{event}', [EventController::class, 'update'])->name('update')->whereNumber('event');
        Route::delete('/{event}', [EventController::class, 'destroy'])->name('destroy')->whereNumber('event');
    });

    // Venues
    Route::prefix('venues')->name('venues.')->group(function () {
        Route::get('/', [VenueController::class, 'index'])->name('index');
        Route::get('/create', [VenueController::class, 'create'])->name('create');
        Route::post('/', [VenueController::class, 'store'])->name('store');
        Route::get('/{venue}', [VenueController::class, 'show'])->name('show')->whereNumber('venue');
        Route::get('/{venue}/edit', [VenueController::class, 'edit'])->name('edit')->whereNumber('venue');
        Route::put('/{venue}', [VenueController::class, 'update'])->name('update')->whereNumber('venue');
        Route::delete('/{venue}', [VenueController::class, 'destroy'])->name('destroy')->whereNumber('venue');
    });

    // Teams
    Route::prefix('teams')->name('teams.')->group(function () {
        Route::get('/', [TeamController::class, 'index'])->name('index');
        Route::get('/create', [TeamController::class, 'create'])->name('create');
        Route::post('/', [TeamController::class, 'store'])->name('store');
        Route::get('/{team}', [TeamController::class, 'show'])->name('show')->whereNumber('team');
        Route::get('/{team}/edit', [TeamController::class, 'edit'])->name('edit')->whereNumber('team');
        Route::put('/{team}', [TeamController::class, 'update'])->name('update')->whereNumber('team');
        Route::delete('/{team}', [TeamController::class, 'destroy'])->name('destroy')->whereNumber('team');
    });

    // Players
    Route::prefix('players')->name('players.')->group(function () {
        Route::get('/', [PlayerController::class, 'index'])->name('index');
        Route::get('/create', [PlayerController::class, 'create'])->name('create');
        Route::post('/', [PlayerController::class, 'store'])->name('store');
        Route::get('/{player}', [PlayerController::class, 'show'])->name('show')->whereNumber('player');
        Route::get('/{player}/edit', [PlayerController::class, 'edit'])->name('edit')->whereNumber('player');
        Route::put('/{player}', [PlayerController::class, 'update'])->name('update')->whereNumber('player');
        Route::delete('/{player}', [PlayerController::class, 'destroy'])->name('destroy')->whereNumber('player');
    });

    // Registrations
    Route::prefix('registrations')->name('registrations.')->group(function () {
        Route::get('/', [RegistrationController::class, 'index'])->name('index');
        Route::get('/create', [RegistrationController::class, 'create'])->name('create');
        Route::post('/', [RegistrationController::class, 'store'])->name('store');
        Route::get('/{registration}', [RegistrationController::class, 'show'])->name('show')->whereNumber('registration');
        Route::get('/{registration}/edit', [RegistrationController::class, 'edit'])->name('edit')->whereNumber('registration');
        Route::put('/{registration}', [RegistrationController::class, 'update'])->name('update')->whereNumber('registration');
        Route::delete('/{registration}', [RegistrationController::class, 'destroy'])->name('destroy')->whereNumber('registration');
    });

    // Tickets
    Route::prefix('tickets')->name('tickets.')->group(function () {
        Route::get('/', [TicketController::class, 'index'])->name('index');
        Route::get('/create', [TicketController::class, 'create'])->name('create');
        Route::post('/', [TicketController::class, 'store'])->name('store');
        Route::get('/{ticket}', [TicketController::class, 'show'])->name('show')->whereNumber('ticket');
        Route::get('/{ticket}/edit', [TicketController::class, 'edit'])->name('edit')->whereNumber('ticket');
        Route::put('/{ticket}', [TicketController::class, 'update'])->name('update')->whereNumber('ticket');
        Route::delete('/{ticket}', [TicketController::class, 'destroy'])->name('destroy')->whereNumber('ticket');
    });
});

// ── Public Schedules ──────────────────────────────────────────────────────────
Route::prefix('schedules')->name('schedules.')->group(function () {
    Route::get('/', [ScheduleController::class, 'index'])->name('index');
    Route::get('/create', [ScheduleController::class, 'create'])->name('create');
    Route::post('/', [ScheduleController::class, 'store'])->name('store');
    Route::get('/{schedule}', [ScheduleController::class, 'show'])->name('show')->whereNumber('schedule');
    Route::get('/{schedule}/edit', [ScheduleController::class, 'edit'])->name('edit')->whereNumber('schedule');
    Route::put('/{schedule}', [ScheduleController::class, 'update'])->name('update')->whereNumber('schedule');
    Route::delete('/{schedule}', [ScheduleController::class, 'destroy'])->name('destroy')->whereNumber('schedule');
});

// ── Continue Authenticated routes for admin/user only ─────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {

    // ── Admin-only User Management ─────────────────────────────────────────────
    Route::middleware('role:admin')->prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::get('/{user}', [UserController::class, 'show'])->name('show');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
    });
    // Dues routes
    Route::get('/dues', [DueController::class, 'index'])->name('dues.index');

    // Audit Logs
    Route::get('/audit-logs', [ActivityController::class, 'index'])->name('activities.index')->middleware('role:admin');

    // News routes
    Route::get('/news', [NewsController::class, 'index'])->name('news.index');

    // Notifications
    Route::get('/api/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read.all');
});

require __DIR__.'/auth.php';
