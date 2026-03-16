<?php

namespace App\Policies;

use App\Models\Player;
use App\Models\User;

class PlayerPolicy
{
    /**
     * Admins bypass all policy checks automatically.
     */
    public function before(User $user, string $ability): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Player $player): bool
    {
        return $user->id === $player->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Player $player): bool
    {
        return $user->id === $player->user_id;
    }

    public function delete(User $user, Player $player): bool
    {
        return $user->id === $player->user_id;
    }
}
