import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ newsletter }) {
    const { post, processing } = useForm({
        newsletter_id: newsletter.id,
    });

    const scheduleNow = (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to send this newsletter to all subscribers now?')) {
            post(route('newsletter.campaigns.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        {newsletter.title}
                    </h2>
                    <div className="space-x-4">
                        <Link href={route('newsletter.edit', newsletter.id)}>
                            <SecondaryButton>Edit</SecondaryButton>
                        </Link>
                        <form onSubmit={scheduleNow} className="inline">
                            <PrimaryButton disabled={processing} className="bg-green-600 hover:bg-green-700">
                                Send Now
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            }
        >
            <Head title={`Newsletter: ${newsletter.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Newsletter Details */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Newsletter Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 whitespace-nowrap">Subject</p>
                                    <p className="mt-1 text-gray-900 dark:text-gray-100">{newsletter.subject}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 whitespace-nowrap">Status</p>
                                    <p className="mt-1">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            newsletter.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {newsletter.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className="text-sm text-gray-500 mb-2">Preview Content</p>
                                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto prose dark:prose-invert max-w-none"
                                     dangerouslySetInnerHTML={{ __html: newsletter.content }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Campaigns */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Past & Scheduled Campaigns</h3>
                            {newsletter.campaigns.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No campaigns found for this newsletter.</p>
                            ) : (
                                <div className="space-y-4">
                                    {newsletter.campaigns.map((campaign) => (
                                        <div key={campaign.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    Campaign #{campaign.id}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {campaign.sent_at ? `Sent on ${new Date(campaign.sent_at).toLocaleString()}` : 'Scheduled'}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-6">
                                                <div className="text-center">
                                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{campaign.metrics_count}</p>
                                                    <p className="text-xs text-gray-500 uppercase tracking-widest">Interactions</p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    campaign.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {campaign.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
