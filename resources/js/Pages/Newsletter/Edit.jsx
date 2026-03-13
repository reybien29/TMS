import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from '@/pages/Profile/Partials/DeleteUserForm';
import UpdatePasswordForm from '@/pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/pages/Profile/Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '5px', height: '22px', background: 'var(--red)', borderRadius: '3px', flexShrink: 0 }} />
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.3rem',
                        fontWeight: 400,
                        color: 'var(--ink)',
                        letterSpacing: '-0.01em',
                        margin: 0,
                    }}>
                        Profile settings
                    </h2>
                </div>
            }
        >
            <Head title="Profile" />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem 1.5rem 4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
            }}>
                <ProfileCard>
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                </ProfileCard>

                <ProfileCard>
                    <UpdatePasswordForm />
                </ProfileCard>

                <ProfileCard danger>
                    <DeleteUserForm />
                </ProfileCard>
            </div>
        </AuthenticatedLayout>
    );
}

function ProfileCard({ children, danger = false }) {
    return (
        <div style={{
            background: 'var(--white)',
            border: `1px solid ${danger ? 'rgba(232,52,26,0.15)' : 'var(--rule)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 2.25rem',
            boxShadow: 'var(--shadow-sm)',
        }}>
            {children}
        </div>
    );
}
