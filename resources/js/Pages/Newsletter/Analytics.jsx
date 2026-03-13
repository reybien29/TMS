import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Analytics({ metrics, recentCampaigns, trendData = {} }) {
    const totalSent = metrics.find(m => m.type === 'sent')?.count || 0;
    const totalOpens = metrics.find(m => m.type === 'open')?.count || 0;
    const totalClicks = metrics.find(m => m.type === 'click')?.count || 0;

    const aggregateOpenRate = totalSent > 0 ? ((totalOpens / totalSent) * 100).toFixed(1) : 0;

    // Prepare trend chart data (30 days)
    const dates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
    }).reverse();

    const trendChartData = dates.map(date => ({
        date,
        opens: trendData.opens?.[date] || 0,
        clicks: trendData.clicks?.[date] || 0,
    }));

    const chartData = recentCampaigns.map(campaign => ({
        name: `Campaign #${campaign.id}`,
        opens: campaign.opens || 0,
        clicks: campaign.clicks || 0,
        openRate: campaign.stats?.openRate || 0,
    }));

    // CSV Export function
    const exportToCSV = () => {
        const headers = ['Metric,Campaign,Sent,Opens,Clicks,Open Rate'];
        const rows = [
            `Total,All,${totalSent},${totalOpens},${totalClicks},${aggregateOpenRate}%`,
            ...recentCampaigns.map(c =>
                `Campaign #${c.id},${c.stats?.sent || 'N/A'},${c.opens || 0},${c.clicks || 0},${c.stats?.openRate?.toFixed(1) || 0}%`
            )
        ];

        const csvContent = headers.join(',') + '\n' + rows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-analytics-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Newsletter Analytics
                    </h2>
                    <button
                        onClick={exportToCSV}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10l-5.5 5.5m5.5-5.5L16 12m0 0l5.5 5.5M16 12l5.5-5.5" />
                        </svg>
                        Export CSV
                    </button>
                </div>
            }
        >
            <Head title="Analytics" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Overall Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard title="Total Sent" value={totalSent.toLocaleString()} />
                        <StatCard title="Total Opens" value={totalOpens.toLocaleString()} />
                        <StatCard title="Total Clicks" value={totalClicks.toLocaleString()} />
                        <StatCard title="Avg Open Rate" value={`${aggregateOpenRate}%`} />
                    </div>

                    {/* Trend Chart - NEW */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">30-Day Trends</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trendChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
                                        <XAxis dataKey="date" angle={-45} height={80} textAnchor="end" fontSize={11} />
                                        <YAxis />
                                        <Tooltip labelFormatter={(label) => `Date: ${label}`} />
                                        <Legend />
                                        <Line type="monotone" dataKey="opens" name="Opens" stroke="#3B82F6" strokeWidth={3} />
                                        <Line type="monotone" dataKey="clicks" name="Clicks" stroke="#10B981" strokeWidth={3} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Open Rate Chart */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Recent Campaign Open Rates</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
                                        <XAxis dataKey="name" angle={-45} height={80} textAnchor="end" fontSize={12} />
                                        <YAxis unit="%" />
                                        <Tooltip formatter={(value) => [`${value}%`, 'Open Rate']} />
                                        <Legend />
                                        <Bar dataKey="openRate" fill="#3B82F6" name="Open Rate (%)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Recent Campaigns Table */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Campaign Performance</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Campaign</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sent</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Opens</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Clicks</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Open Rate</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {recentCampaigns.map((campaign) => (
                                            <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    Campaign #{campaign.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                    {campaign.stats?.sent?.toLocaleString() || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                    {campaign.opens?.toLocaleString() || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                    {campaign.clicks?.toLocaleString() || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600">
                                                    {campaign.stats?.openRate?.toFixed(1)}%
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={route('newsletter.campaigns.show', campaign.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    );
}

