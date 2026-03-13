import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            {/* Icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <div style={{
                    width: '3.5rem', height: '3.5rem',
                    background: 'var(--red-subtle)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.75">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--ink)', letterSpacing: '-0.01em', margin: '0 0 0.625rem' }}>
                    Verify your email
                </h1>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>
                    Thanks for signing up! We've sent a verification link to your email. Click it to get started.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div style={{
                    background: 'rgba(42,122,75,0.08)',
                    border: '1px solid rgba(42,122,75,0.2)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    color: '#2a7a4b',
                    marginBottom: '1.25rem',
                    textAlign: 'center',
                }}>
                    A new verification link has been sent to your email.
                </div>
            )}

            <form onSubmit={submit}>
                <PrimaryButton style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }} disabled={processing}>
                    {processing ? 'Sending…' : 'Resend verification email'}
                </PrimaryButton>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: '0.85rem', color: 'var(--ink-3)',
                        textDecoration: 'underline', textUnderlineOffset: '2px',
                        fontFamily: 'var(--font-sans)',
                    }}
                >
                    Sign out
                </Link>
            </div>
        </GuestLayout>
    );
}
