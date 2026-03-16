import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <DashboardLayout>
            <Head title="Profile" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Account Settings</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Manage your profile information, password, and security settings.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 border-rose-100 bg-rose-50/10">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
