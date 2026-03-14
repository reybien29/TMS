<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'qr_code',
        'status',
        'seat_number',
        'section',
        'checked_in_at',
        'checked_in_by',
        'user_id',
    ];

    protected $casts = [
        'status' => 'string',
        'checked_in_at' => 'datetime',
    ];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->registration->event;
    }

    public function player()
    {
        return $this->registration->player;
    }
}
