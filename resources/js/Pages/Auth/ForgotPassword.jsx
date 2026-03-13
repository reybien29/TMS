import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--ink)', letterSpacing: '-0.01em', margin: '0 0 0.5rem' }}>
                    Reset your password
                </h1>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            {status && (
                <div style={{
                    background: 'rgba(42,122,75,0.08)',
                    border: '1px solid rgba(42,122,75,0.2)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    color: '#2a7a4b',
                    marginBottom: '1.25rem',
                }}>
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <InputLabel htmlFor="email" value="Email address" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        isFocused={true}
                        onChange={e => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                <PrimaryButton style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }} disabled={processing}>
                    {processing ? 'Sending…' : 'Send reset link'}
                </PrimaryButton>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--ink-3)', marginTop: '1.25rem' }}>
                <Link href={route('login')} style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    Back to sign in
                </Link>
            </p>
        </GuestLayout>
    );
}
