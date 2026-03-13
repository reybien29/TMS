<?php

namespace App\Models;

use App\Enums\NewsletterStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Newsletter extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subject',
        'content',
        'status',
        'user_id',
    ];

    protected $casts = [
        'status' => NewsletterStatus::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function campaigns(): HasMany
    {
        return $this->hasMany(Campaign::class);
    }
}
