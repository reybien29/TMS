<?php

namespace App\Services;

use App\Models\Activity;
use Illuminate\Support\Facades\Auth;

class AuditLogService
{
    public static function log(string $action, ?string $modelType = null, ?int $modelId = null, $details = null): void
    {
        if (! Auth::check()) {
            return;
        }

        Activity::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'model_type' => $modelType,
            'model_id' => $modelId,
            'details' => $details,
            'ip_address' => request()->ip(),
        ]);
    }
}
