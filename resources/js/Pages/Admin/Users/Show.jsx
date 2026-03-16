import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, user }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Details</h2>}>
            <Head title={`User: ${user.name}`} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">User Information</h3>
                                <div className="space-y-2">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Role:</strong>
                                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                            user.role === 'admin'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </p>
                                    <p><strong>Created:</strong> {new Date(user.created_at).toLocaleString()}</p>
                                    <p><strong>Updated:</strong> {new Date(user.updated_at).toLocaleString()}</p>
                                </div>
                            </div>

                            {user.events && user.events.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Events ({user.events.length})</h3>
                                    <ul className="space-y-1">
                                        {user.events.map((event) => (
                                            <li key={event.id} className="text-sm text-gray-600">
                                                <Link href={route('events.show', event.id)} className="hover:text-indigo-600">
                                                    {event.name} - {new Date(event.start_date).toLocaleDateString()}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {user.teams && user.teams.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Teams ({user.teams.length})</h3>
                                    <ul className="space-y-1">
                                        {user.teams.map((team) => (
                                            <li key={team.id} className="text-sm text-gray-600">
                                                <Link href={route('teams.show', team.id)} className="hover:text-indigo-600">
                                                    {team.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex items-center justify-end space-x-3">
                                <Link href={route('users.index')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                    Back to Users
                                </Link>
                                <Link href={route('users.edit', user.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

