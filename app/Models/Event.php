<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'event_type',
        'start_time',
        'end_time',
        'status',
        'venue_id',
        'team_id',
        'opponent_team_id',
        'user_id',
        'max_participants',
        'registration_fee',
        'event_code',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'event_type' => 'string',
        'status' => 'string',
        'max_participants' => 'integer',
        'registration_fee' => 'decimal:2',
    ];

    public function venue(): BelongsTo
    {
        return $this->belongsTo(Venue::class);
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function opponentTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'opponent_team_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    public function schedule(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    public function tickets()
    {
        return $this->hasManyThrough(Ticket::class, Registration::class);
    }
}
