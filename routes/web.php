<?php

use App\Http\Controllers\Newsletter\CampaignController;
use App\Http\Controllers\Newsletter\MetricController;
use App\Http\Controllers\Newsletter\NewsletterController;
use App\Http\Controllers\Newsletter\SubscriberController;
use App\Http\Controllers\ProfileController;
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

    Route::prefix('newsletter')->group(function () {
        Route::get('/subscribers', [SubscriberController::class, 'index'])->name('newsletter.subscribers.index');
        Route::get('/subscribers/create', [SubscriberController::class, 'create'])->name('newsletter.subscribers.create');
        Route::post('/subscribers', [SubscriberController::class, 'store'])->name('newsletter.subscribers.store');
        Route::get('/subscribers/{subscriber}', [SubscriberController::class, 'show'])->name('newsletter.subscribers.show')->whereNumber('subscriber');
        Route::get('/subscribers/{subscriber}/edit', [SubscriberController::class, 'edit'])->name('newsletter.subscribers.edit')->whereNumber('subscriber');
        Route::put('/subscribers/{subscriber}', [SubscriberController::class, 'update'])->name('newsletter.subscribers.update')->whereNumber('subscriber');
        Route::delete('/subscribers/{subscriber}', [SubscriberController::class, 'destroy'])->name('newsletter.subscribers.destroy')->whereNumber('subscriber');

        Route::get('/campaigns', [CampaignController::class, 'index'])->name('newsletter.campaigns.index');
        Route::get('/campaigns/create', [CampaignController::class, 'create'])->name('newsletter.campaigns.create');
        Route::post('/campaigns', [CampaignController::class, 'store'])->name('newsletter.campaigns.store');
        Route::get('/campaigns/{campaign}', [CampaignController::class, 'show'])->name('newsletter.campaigns.show')->whereNumber('campaign');
        Route::get('/campaigns/{campaign}/edit', [CampaignController::class, 'edit'])->name('newsletter.campaigns.edit')->whereNumber('campaign');
        Route::put('/campaigns/{campaign}', [CampaignController::class, 'update'])->name('newsletter.campaigns.update')->whereNumber('campaign');
        Route::delete('/campaigns/{campaign}', [CampaignController::class, 'destroy'])->name('newsletter.campaigns.destroy')->whereNumber('campaign');

        Route::get('/metrics', [MetricController::class, 'index'])->name('newsletter.metrics.index');

        Route::get('/', [NewsletterController::class, 'index'])->name('newsletter.index');
        Route::get('/create', [NewsletterController::class, 'create'])->name('newsletter.create');
        Route::post('/', [NewsletterController::class, 'store'])->name('newsletter.store');
        Route::get('/{newsletter}', [NewsletterController::class, 'show'])->name('newsletter.show')->whereNumber('newsletter');
        Route::get('/{newsletter}/edit', [NewsletterController::class, 'edit'])->name('newsletter.edit')->whereNumber('newsletter');
        Route::put('/{newsletter}', [NewsletterController::class, 'update'])->name('newsletter.update')->whereNumber('newsletter');
        Route::delete('/{newsletter}', [NewsletterController::class, 'destroy'])->name('newsletter.destroy')->whereNumber('newsletter');
    });
});

Route::get('/newsletter/track/{campaign}/{type}', [MetricController::class, 'track'])
    ->name('newsletter.track')
    ->whereNumber('campaign');
Route::get('/newsletter/unsubscribe/{subscriber}', [SubscriberController::class, 'unsubscribe'])
    ->name('newsletter.subscribers.unsubscribe')
    ->middleware('signed')
    ->whereNumber('subscriber');

require __DIR__.'/auth.php';
