import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.35rem' }}>
                    Almost there
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--ink)', letterSpacing: '-0.01em', margin: 0 }}>
                    Choose a new password
                </h1>
            </div>

            <form onSubmit={submit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                    <div>
                        <InputLabel htmlFor="email" value="Email address" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={e => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="New password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            isFocused={true}
                            autoComplete="new-password"
                            onChange={e => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm new password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                </div>

                <div style={{ marginTop: '1.75rem' }}>
                    <PrimaryButton style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }} disabled={processing}>
                        {processing ? 'Resetting…' : 'Reset password'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
