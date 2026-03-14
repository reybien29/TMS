<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\VenueController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Event Management Routes
    Route::prefix('events')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('events.index');
        Route::get('/create', [EventController::class, 'create'])->name('events.create');
        Route::post('/', [EventController::class, 'store'])->name('events.store');
        Route::get('/{event}', [EventController::class, 'show'])->name('events.show')->whereNumber('event');
        Route::get('/{event}/edit', [EventController::class, 'edit'])->name('events.edit')->whereNumber('event');
        Route::put('/{event}', [EventController::class, 'update'])->name('events.update')->whereNumber('event');
        Route::delete('/{event}', [EventController::class, 'destroy'])->name('events.destroy')->whereNumber('event');
    });

    // Venue Management Routes
    Route::prefix('venues')->group(function () {
        Route::get('/', [VenueController::class, 'index'])->name('venues.index');
        Route::get('/create', [VenueController::class, 'create'])->name('venues.create');
        Route::post('/', [VenueController::class, 'store'])->name('venues.store');
        Route::get('/{venue}', [VenueController::class, 'show'])->name('venues.show')->whereNumber('venue');
        Route::get('/{venue}/edit', [VenueController::class, 'edit'])->name('venues.edit')->whereNumber('venue');
        Route::put('/{venue}', [VenueController::class, 'update'])->name('venues.update')->whereNumber('venue');
        Route::delete('/{venue}', [VenueController::class, 'destroy'])->name('venues.destroy')->whereNumber('venue');
    });

    // Team Management Routes
    Route::prefix('teams')->group(function () {
        Route::get('/', [TeamController::class, 'index'])->name('teams.index');
        Route::get('/create', [TeamController::class, 'create'])->name('teams.create');
        Route::post('/', [TeamController::class, 'store'])->name('teams.store');
        Route::get('/{team}', [TeamController::class, 'show'])->name('teams.show')->whereNumber('team');
        Route::get('/{team}/edit', [TeamController::class, 'edit'])->name('teams.edit')->whereNumber('team');
        Route::put('/{team}', [TeamController::class, 'update'])->name('teams.update')->whereNumber('team');
        Route::delete('/{team}', [TeamController::class, 'destroy'])->name('teams.destroy')->whereNumber('team');
    });

    // Player Management Routes
    Route::prefix('players')->group(function () {
        Route::get('/', [PlayerController::class, 'index'])->name('players.index');
        Route::get('/create', [PlayerController::class, 'create'])->name('players.create');
        Route::post('/', [PlayerController::class, 'store'])->name('players.store');
        Route::get('/{player}', [PlayerController::class, 'show'])->name('players.show')->whereNumber('player');
        Route::get('/{player}/edit', [PlayerController::class, 'edit'])->name('players.edit')->whereNumber('player');
        Route::put('/{player}', [PlayerController::class, 'update'])->name('players.update')->whereNumber('player');
        Route::delete('/{player}', [PlayerController::class, 'destroy'])->name('players.destroy')->whereNumber('player');
    });

    // Registration Management Routes
    Route::prefix('registrations')->group(function () {
        Route::get('/', [RegistrationController::class, 'index'])->name('registrations.index');
        Route::get('/create', [RegistrationController::class, 'create'])->name('registrations.create');
        Route::post('/', [RegistrationController::class, 'store'])->name('registrations.store');
        Route::get('/{registration}', [RegistrationController::class, 'show'])->name('registrations.show')->whereNumber('registration');
        Route::get('/{registration}/edit', [RegistrationController::class, 'edit'])->name('registrations.edit')->whereNumber('registration');
        Route::put('/{registration}', [RegistrationController::class, 'update'])->name('registrations.update')->whereNumber('registration');
        Route::delete('/{registration}', [RegistrationController::class, 'destroy'])->name('registrations.destroy')->whereNumber('registration');
    });

    // Ticket Management Routes
    Route::prefix('tickets')->group(function () {
        Route::get('/', [TicketController::class, 'index'])->name('tickets.index');
        Route::get('/create', [TicketController::class, 'create'])->name('tickets.create');
        Route::post('/', [TicketController::class, 'store'])->name('tickets.store');
        Route::get('/{ticket}', [TicketController::class, 'show'])->name('tickets.show')->whereNumber('ticket');
        Route::get('/{ticket}/edit', [TicketController::class, 'edit'])->name('tickets.edit')->whereNumber('ticket');
        Route::put('/{ticket}', [TicketController::class, 'update'])->name('tickets.update')->whereNumber('ticket');
        Route::delete('/{ticket}', [TicketController::class, 'destroy'])->name('tickets.destroy')->whereNumber('ticket');
    });

    // Schedule Management Routes
    Route::prefix('schedules')->group(function () {
        Route::get('/', [ScheduleController::class, 'index'])->name('schedules.index');
        Route::get('/create', [ScheduleController::class, 'create'])->name('schedules.create');
        Route::post('/', [ScheduleController::class, 'store'])->name('schedules.store');
        Route::get('/{schedule}', [ScheduleController::class, 'show'])->name('schedules.show')->whereNumber('schedule');
        Route::get('/{schedule}/edit', [ScheduleController::class, 'edit'])->name('schedules.edit')->whereNumber('schedule');
        Route::put('/{schedule}', [ScheduleController::class, 'update'])->name('schedules.update')->whereNumber('schedule');
        Route::delete('/{schedule}', [ScheduleController::class, 'destroy'])->name('schedules.destroy')->whereNumber('schedule');
    });
});

require __DIR__.'/auth.php';
