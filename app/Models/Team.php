<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'abbreviation',
        'logo',
        'coach_name',
        'coach_contact',
        'team_type',
        'age_group',
        'division',
        'league',
        'user_id',
    ];

    protected $casts = [
        'age_group' => 'string',
        'team_type' => 'string',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }

    public function homeGames(): HasMany
    {
        return $this->hasMany(Schedule::class, 'home_team_id');
    }

    public function awayGames(): HasMany
    {
        return $this->hasMany(Schedule::class, 'away_team_id');
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function opponentEvents(): HasMany
    {
        return $this->hasMany(Event::class, 'opponent_team_id');
    }
}
