<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Venue;

class VenuePolicy
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

    public function view(User $user, Venue $venue): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Venue $venue): bool
    {
        return $user->id === $venue->user_id;
    }

    public function delete(User $user, Venue $venue): bool
    {
        return $user->id === $venue->user_id;
    }
}
