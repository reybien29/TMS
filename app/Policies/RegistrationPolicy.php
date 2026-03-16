<?php

namespace App\Policies;

use App\Models\Registration;
use App\Models\User;

class RegistrationPolicy
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

    public function view(User $user, Registration $registration): bool
    {
        return $user->id === $registration->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Registration $registration): bool
    {
        return $user->id === $registration->user_id;
    }

    public function delete(User $user, Registration $registration): bool
    {
        return $user->id === $registration->user_id;
    }
}
