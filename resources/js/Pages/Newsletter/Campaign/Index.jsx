import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ campaigns, newsletters = [] }) {
    const { delete: destroy } = useForm();

    const [selectedNewsletterId, setSelectedNewsletterId] = React.useState(newsletters[0]?.id || '');

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this campaign?')) {
            destroy(route('newsletter.campaigns.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Campaigns
                </h2>
                {newsletters.length === 0 ? (
                    <Link
                        href={route('newsletter.create')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                        Create Newsletter First
                    </Link>
                ) : (
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedNewsletterId}
                            onChange={(e) => setSelectedNewsletterId(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {newsletters.map((newsletter) => (
                                <option key={newsletter.id} value={newsletter.id}>
                                    {newsletter.title}
                                </option>
                            ))}
                        </select>
                        <PrimaryButton
                            onClick={() => router.visit(route('newsletter.campaigns.create', { newsletter_id: selectedNewsletterId }))}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 font-medium whitespace-nowrap"
                        >
                            Create Campaign
                        </PrimaryButton>
                    </div>
                )}
            </div>
            }
        >
            <Head title="Campaigns" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl dark:bg-gray-800 sm:rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {campaigns.data.length === 0 ? (
                                <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any campaigns yet.</p>
                            {newsletters.length > 0 ? (
                                <PrimaryButton
                                    onClick={() => router.visit(route('newsletter.campaigns.create', { newsletter_id: selectedNewsletterId }))}
                                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                                >
                                    Create your first one &rarr;
                                </PrimaryButton>
                            ) : (
                                <Link href={route('newsletter.create')} className="text-indigo-600 hover:text-indigo-500 font-medium">
                                    Create a newsletter first &rarr;
                                </Link>
                            )}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Newsletter</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sent At</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {campaigns.data.map((campaign) => (
                                                <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {campaign.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                                                            campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                                                            campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {campaign.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                        {campaign.newsletter?.title || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                        {campaign.sent_at ? new Date(campaign.sent_at).toLocaleDateString() : 'Not sent'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                        <Link
                                                            href={route('newsletter.campaigns.show', campaign.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('newsletter.campaigns.edit', campaign.id)}
                                                            className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(campaign.id)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Delete
                                                        </button>
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
