import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
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
                        <form onSubmit={submit} className="p-6">
                            <div className="space-y-6">
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

                                <div>
                                    <InputLabel htmlFor="content" value="Campaign Content" />
                                    <NewsletterEditor
                                        value={data.content}
                                        onChange={(content) => setData('content', content)}
                                        error={errors.content}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Customize the content for this specific campaign.</p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="scheduled_at" value="Send Now or Schedule" />
                                    <input
                                        id="scheduled_at"
                                        type="datetime-local"
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:text-white"
                                        value={data.scheduled_at}
                                        onChange={(e) => setData('scheduled_at', e.target.value || null)}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leave empty to send immediately.</p>
                                    <InputError message={errors.scheduled_at} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton className={processing ? 'opacity-25' : ''} disabled={processing}>
                                        Create &amp; {data.scheduled_at ? 'Schedule' : 'Send'} Campaign
                                    </PrimaryButton>

                                    <button
                                        type="button"
                                        onClick={() => router.visit(route('newsletter.show', newsletter.id))}
                                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg transition-colors font-medium"
                                        disabled={processing}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

