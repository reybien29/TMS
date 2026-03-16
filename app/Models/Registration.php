<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'player_id',
        'registration_type',
        'payment_status',
        'payment_amount',
        'payment_method',
        'transaction_id',
        'payment_date',
        'notes',
        'team_id',
        'user_id',
    ];

    protected $casts = [
        'payment_status' => 'string',
        'registration_type' => 'string',
        'payment_amount' => 'decimal:2',
        'payment_date' => 'datetime',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function ticket(): HasOne
    {
        return $this->hasOne(Ticket::class);
    }
}
