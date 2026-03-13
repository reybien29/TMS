import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ campaign }) {
    const stats = {
        sent: campaign.metrics.filter(m => m.type === 'sent').length,
        opens: campaign.metrics.filter(m => m.type === 'open').length,
        clicks: campaign.metrics.filter(m => m.type === 'click').length,
    };

    const openRate = stats.sent > 0 ? ((stats.opens / stats.sent) * 100).toFixed(1) : 0;
    const clickRate = stats.sent > 0 ? ((stats.clicks / stats.sent) * 100).toFixed(1) : 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Campaign #{campaign.id} Analysis
                    </h2>
                    <Link href={route('newsletter.show', campaign.newsletter_id)}>
                        <p className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">&larr; Back to Newsletter</p>
                    </Link>
                </div>
            }
        >
            <Head title={`Campaign #${campaign.id} Analysis`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Sent</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stats.sent}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Open Rate</p>
                            <div className="mt-2 flex items-baseline">
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{openRate}%</p>
                                <p className="ml-2 text-sm text-gray-500">({stats.opens} opens)</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Click Rate</p>
                            <div className="mt-2 flex items-baseline">
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{clickRate}%</p>
                                <p className="ml-2 text-sm text-gray-500">({stats.clicks} clicks)</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Events */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Engagement Events</h3>
                            {campaign.metrics.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No engagement events tracked yet.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {campaign.metrics.slice(0, 20).map((metric) => (
                                                <tr key={metric.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                            metric.type === 'open' ? 'bg-blue-100 text-blue-800' : 
                                                            metric.type === 'click' ? 'bg-indigo-100 text-indigo-800' : 
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {metric.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                        {new Date(metric.occurred_at).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                        {metric.value?.ip || 'Unknown IP'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
