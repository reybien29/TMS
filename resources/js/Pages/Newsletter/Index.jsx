import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ newsletters }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Newsletters
                    </h2>
                    <Link
                        href={route('newsletter.create')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                        Create Newsletter
                    </Link>
                </div>
            }
        >
            <Head title="Newsletters" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl dark:bg-gray-800 sm:rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {newsletters.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any newsletters yet.</p>
                                    <Link
                                        href={route('newsletter.create')}
                                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                                    >
                                        Create your first one &rarr;
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Campaigns</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {newsletters.data.map((newsletter) => (
                                                <tr key={newsletter.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {newsletter.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                        {newsletter.subject}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            newsletter.status === 'sent' ? 'bg-green-100 text-green-800' : 
                                                            newsletter.status === 'draft' ? 'bg-gray-100 text-gray-800' : 
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {newsletter.status.charAt(0).toUpperCase() + newsletter.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                        {newsletter.campaigns_count}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                        <Link
                                                            href={route('newsletter.show', newsletter.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('newsletter.edit', newsletter.id)}
                                                            className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                        >
                                                            Edit
                                                        </Link>
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
