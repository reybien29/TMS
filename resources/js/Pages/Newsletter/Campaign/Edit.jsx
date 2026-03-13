import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Edit({ campaign }) {
    const { data, setData, patch, processing, errors } = useForm({
        scheduled_at: campaign.scheduled_at ? campaign.scheduled_at.slice(0, 16) : '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('newsletter.campaigns.update', campaign.id));
    };

    return (
        <AuthenticatedLayout header="Edit Campaign Schedule">
            <Head title="Edit Campaign" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={submit} className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="scheduled_at" value="Reschedule Campaign" />
                                    <input
                                        id="scheduled_at"
                                        type="datetime-local"
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:text-white"
                                        value={data.scheduled_at}
                                        onChange={(e) => setData('scheduled_at', e.target.value)}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leave empty to remove schedule.</p>
                                    <InputError message={errors.scheduled_at} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton className={processing ? 'opacity-25' : ''} disabled={processing}>
                                        Update Schedule
                                    </PrimaryButton>

                                    <button
                                        type="button"
                                        onClick={() => router.visit(route('newsletter.campaigns.index'))}
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
