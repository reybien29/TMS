import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

import NewsletterEditor from '@/Components/Newsletter/NewsletterEditor';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subject: '',
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('newsletter.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Newsletter
                </h2>
            }
        >
            <Head title="Create Newsletter" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl dark:bg-gray-800 sm:rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="p-8">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Internal Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
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
                                    <InputError message={errors.subject} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="content" value="Content" />
                                    <NewsletterEditor
                                        value={data.content}
                                        onChange={(content) => setData('content', content)}
                                        error={errors.content}
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        href={route('newsletter.index')}
                                        className="mr-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Save Newsletter
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
