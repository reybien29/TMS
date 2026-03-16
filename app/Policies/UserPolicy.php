<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): bool
    {
        return $user->isAdmin();
    }

    public function viewAny(User $user): bool
    {
        return $user->hasRole('user'); // users see list? No, admin only, but before bypasses
    }

    public function view(User $user, User $model): bool
    {
        return true; // admin sees all
    }

    public function create(User $user): bool
    {
        return $user->hasRole('user');
    }

    public function update(User $user, User $model): bool
    {
        return true;
    }

    public function delete(User $user, User $model): bool
    {
        return $model->id !== $user->id; // can't self-delete
    }
}
