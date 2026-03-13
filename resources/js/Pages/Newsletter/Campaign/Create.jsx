import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { router } from '@inertiajs/react';
import NewsletterEditor from '@/Components/Newsletter/NewsletterEditor';

export default function Create({ newsletter }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        newsletter_id: newsletter.id,
        subject: newsletter.subject || '',
        content: newsletter.content || '',
        scheduled_at: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('newsletter.campaigns.store'));
    };

    return (
        <AuthenticatedLayout header={`Create Campaign for "${newsletter.title}"`}>
            <Head title={`Create Campaign - ${newsletter.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Create Campaign</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Customize your campaign for "{newsletter.title}"</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                                        </svg>
                                        Campaign
                                    </span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="p-6">
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <InputLabel htmlFor="title" value="Campaign Title" />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={data.title || ''}
                                            className="mt-1 block w-full"
                                            placeholder="e.g., Spring Newsletter Campaign"
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">A descriptive title for your campaign.</p>
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="subject" value="Email Subject" />
                                        <TextInput
                                            id="subject"
                                            type="text"
                                            name="subject"
                                            value={data.subject}
                                            className="mt-1 block w-full"
                                            autoComplete="subject"
                                            onChange={(e) => setData('subject', e.target.value)}
                                        />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Can be different from the newsletter's default subject.</p>
                                        <InputError message={errors.subject} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="content" value="Campaign Content" />
                                    <NewsletterEditor
                                        value={data.content}
                                        onChange={(content) => setData('content', content)}
                                        error={errors.content}
                                    />
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Customize the content for this specific campaign. Use the editor toolbar to format your content.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="scheduled_at" value="Send Timing" />
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                id="scheduled_at"
                                                type="datetime-local"
                                                className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:text-white"
                                                value={data.scheduled_at}
                                                onChange={(e) => setData('scheduled_at', e.target.value || null)}
                                            />
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Select a date and time to schedule this campaign. Leave empty to send immediately.</p>
                                        <InputError message={errors.scheduled_at} className="mt-2" />
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Quick Actions</h4>
                                        <div className="space-y-2">
                                            <button
                                                type="button"
                                                onClick={() => setData('scheduled_at', '')}
                                                className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                Send immediately
                                            </button>
                                            <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const now = new Date();
                                                    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
                                                    setData('scheduled_at', nextHour.toISOString().slice(0, 16));
                                                }}
                                                className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                Schedule for next hour
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-4">
                                        <PrimaryButton className={processing ? 'opacity-50 cursor-not-allowed' : ''} disabled={processing}>
                                            {processing ? (
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                                                </svg>
                                            )}
                                            Create & {data.scheduled_at ? 'Schedule' : 'Send'} Campaign
                                        </PrimaryButton>

                                        <SecondaryButton
                                            type="button"
                                            onClick={() => router.visit(route('newsletter.show', newsletter.id))}
                                            className={processing ? 'opacity-50 cursor-not-allowed' : ''}
                                            disabled={processing}
                                        >
                                            Cancel
                                        </SecondaryButton>
                                    </div>

                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {data.scheduled_at ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Scheduled for {new Date(data.scheduled_at).toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                Will send immediately
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

