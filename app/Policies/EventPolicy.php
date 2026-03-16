<?php

namespace App\Policies;

use App\Models\Event;
use App\Models\User;

class EventPolicy
{
    /**
     * Admins bypass all policy checks automatically.
     */
    public function before(User $user, string $ability): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null; // continue to individual methods for regular users
    }

    /**
     * Determine whether the user can view any events.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('user');
    }

    /**
     * Determine whether the user can view the event.
     * Users can only view their own events.
     */
    public function view(User $user, Event $event): bool
    {
        return true; // Any member can view event details
    }

    /**
     * Determine whether the user can create events.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('user');
    }

    /**
     * Determine whether the user can update the event.
     * Users can only update their own events.
     */
    public function update(User $user, Event $event): bool
    {
        return $user->id === $event->user_id;
    }

    /**
     * Determine whether the user can delete the event.
     * Users can only delete their own events.
     */
    public function delete(User $user, Event $event): bool
    {
        return $user->id === $event->user_id;
    }

    /**
     * Restore is reserved for admin only (handled via before()).
     */
    public function restore(User $user, Event $event): bool
    {
        return false;
    }

    /**
     * Force delete is reserved for admin only (handled via before()).
     */
    public function forceDelete(User $user, Event $event): bool
    {
        return false;
    }
}
