import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <GuestLayout>
            <Head title="Create account" />

            <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.35rem' }}>
                    Get started
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--ink)', letterSpacing: '-0.01em', margin: 0 }}>
                    Create your account
                </h1>
            </div>

            <form onSubmit={submit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                    <div>
                        <InputLabel htmlFor="name" value="Full name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            isFocused={true}
                            autoComplete="name"
                            onChange={e => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email address" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={e => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={e => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={e => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    <PrimaryButton style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }} disabled={processing}>
                        {processing ? 'Creating account…' : 'Create account'}
                    </PrimaryButton>
                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--ink-3)' }}>
                        Already have an account?{' '}
                        <Link href={route('login')} style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
