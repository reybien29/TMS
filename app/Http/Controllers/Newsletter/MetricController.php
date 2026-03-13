<?php

namespace App\Http\Controllers\Newsletter;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Metric;
use App\Services\MetricService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MetricController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $metrics = MetricService::summaryByUser($user->id);
        $trendData = [
            'opens' => MetricService::trendsByUser($user->id, 'open'),
            'clicks' => MetricService::trendsByUser($user->id, 'click'),
        ];

        $campaigns = Campaign::where('user_id', $user->id)
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($c) => $c->setRelation('stats', MetricService::aggregate($c)));

        return Inertia::render('Newsletter/Analytics', [
            'metrics' => $metrics,
            'recentCampaigns' => $campaigns,
            'trendData' => $trendData,
        ]);
    }

    public static function scopeRecentMetrics(Builder $query, int $limit = 20): Builder
    {
        return $query->latest()->limit($limit);
    }

    public function track(Request $request, Campaign $campaign, $type)
    {
        $subscriberId = $request->query('subscriber_id');

        Metric::create([
            'campaign_id' => $campaign->id,
            'subscriber_id' => $subscriberId,
            'type' => $type,
            'user_id' => $campaign->user_id,
            'occurred_at' => now(),
            'value' => [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ],
        ]);

        if ($type === 'click' && $request->has('url')) {
            return redirect($request->url);
        }

        // Return a 1x1 transparent GIF for 'open' tracking
        if ($type === 'open') {
            return response(base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'))
                ->header('Content-Type', 'image/gif');
        }

        return response()->json(['status' => 'success']);
    }
}
