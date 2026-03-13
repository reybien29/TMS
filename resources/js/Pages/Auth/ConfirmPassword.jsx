import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '2.75rem', height: '2.75rem',
                    background: 'rgba(232,52,26,0.08)',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--ink)', letterSpacing: '-0.01em', margin: '0 0 0.5rem' }}>
                    Confirm your password
                </h1>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>
                    This is a secure area. Please confirm your password before continuing.
                </p>
            </div>

            <form onSubmit={submit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        isFocused={true}
                        onChange={e => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <PrimaryButton style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }} disabled={processing}>
                    {processing ? 'Confirming…' : 'Confirm'}
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
