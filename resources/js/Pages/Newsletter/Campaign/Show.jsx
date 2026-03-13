import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { format } from 'date-fns';

export default function Show({ campaign }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not scheduled';
        return format(new Date(dateString), 'PPp');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'pending':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            case 'sending':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'failed':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        }
    };

    const handleResend = () => {
        if (confirm('Are you sure you want to resend this campaign?')) {
            router.post(route('newsletter.campaigns.resend', campaign.id));
        }
    };

    return (
        <AuthenticatedLayout header={`Campaign: ${campaign.title || 'Untitled'}`}>
            <Head title={`Campaign - ${campaign.title || 'Untitled'}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Campaign Header */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {campaign.title || 'Untitled Campaign'}
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        Subject: {campaign.subject || 'No subject'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                    </span>
                                    <PrimaryButton
                                        onClick={() => router.visit(route('newsletter.campaigns.edit', campaign.id))}
                                        className="flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Campaign
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>

                        {/* Campaign Details */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Newsletter</h3>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {campaign.newsletter?.title || 'N/A'}
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Scheduled For</h3>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {formatDate(campaign.scheduled_at)}
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Sent At</h3>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {campaign.sent_at ? formatDate(campaign.sent_at) : 'Not sent'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Campaign Content */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Content</h2>
                        </div>
                        <div className="p-6">
                            <div
                                className="prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: campaign.content }}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Actions</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-wrap gap-4">
                                <PrimaryButton
                                    onClick={() => router.visit(route('newsletter.campaigns.create', { newsletter_id: campaign.newsletter_id }))}
                                    className="flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                                    </svg>
                                    Create New Campaign
                                </PrimaryButton>

                                <SecondaryButton
                                    onClick={() => router.visit(route('newsletter.campaigns.index'))}
                                    className="flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                    </svg>
                                    Back to Campaigns
                                </SecondaryButton>

                                {campaign.status === 'completed' && (
                                    <SecondaryButton
                                        onClick={handleResend}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Resend Campaign
                                    </SecondaryButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
