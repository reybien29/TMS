import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Sign in" />

            {/* Heading */}
            <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.35rem' }}>
                    Welcome back
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--ink)', letterSpacing: '-0.01em', margin: 0 }}>
                    Sign in to your account
                </h1>
            </div>

            {status && (
                <div style={{
                    background: 'rgba(42, 122, 75, 0.08)',
                    border: '1px solid rgba(42, 122, 75, 0.2)',
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                    <div>
                        <InputLabel htmlFor="email" value="Email address" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            isFocused={true}
                            autoComplete="username"
                            onChange={e => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                            <InputLabel htmlFor="password" value="Password" style={{ margin: 0 }} />
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    style={{ fontSize: '0.78rem', color: 'var(--red)', textDecoration: 'none', fontWeight: 500 }}
                                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={e => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={e => setData('remember', e.target.checked)}
                        />
                        <span style={{ fontSize: '0.875rem', color: 'var(--ink-3)' }}>Remember me</span>
                    </label>
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    <PrimaryButton style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }} disabled={processing}>
                        {processing ? 'Signing in…' : 'Sign in'}
                    </PrimaryButton>
                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--ink-3)' }}>
                        Don't have an account?{' '}
                        <Link href={route('register')} style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
