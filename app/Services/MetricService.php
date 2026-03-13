<?php

namespace App\Services;

use App\Models\Campaign;
use App\Models\Metric;
use Illuminate\Database\Eloquent\Builder;

class MetricService
{
    /**
     * Aggregate metrics for a campaign.
     */
    public static function aggregate(Campaign $campaign): array
    {
        $metrics = $campaign->metrics()->selectRaw('type, count(*) as count')
            ->groupBy('type')
            ->pluck('count', 'type');

        $opens = $metrics->get('open', 0);
        $clicks = $metrics->get('click', 0);
        $sent = $campaign->recipients_count ?? 0;

        $openRate = $sent > 0 ? round(($opens / $sent) * 100, 2) : 0;
        $clickRate = $opens > 0 ? round(($clicks / $opens) * 100, 2) : 0;

        return compact('opens', 'clicks', 'openRate', 'clickRate', 'sent');
    }

    /**
     * Scope for recent metrics.
     */
    public static function scopeRecentMetrics(Builder $query, int $limit = 20): Builder
    {
        return $query->latest()->limit($limit);
    }

    /**
     * Get time-series trends for user (daily aggregates, last 30 days)
     */
    public static function trendsByUser(int $userId, string $type = 'open', int $days = 30): array
    {
        return Metric::where('user_id', $userId)
            ->where('type', $type)
            ->where('occurred_at', '>=', now()->subDays($days))
            ->selectRaw('DATE(occurred_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('count', 'date')
            ->toArray();
    }

    /**
     * Get summary by type for user.
     */
    public static function summaryByUser(int $userId): array
    {
        return Metric::where('user_id', $userId)
            ->selectRaw('type, count(*) as count')
            ->groupBy('type')
            ->pluck('count', 'type')
            ->toArray();
    }
}
