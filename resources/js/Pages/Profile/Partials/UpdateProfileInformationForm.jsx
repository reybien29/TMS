import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <SectionHeader
                title="Profile information"
                description="Update your name and email address."
            />

            <form onSubmit={submit} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                <div>
                    <InputLabel htmlFor="name" value="Full name" />
                    <TextInput
                        id="name"
                        value={data.name}
                        isFocused
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
                        value={data.email}
                        autoComplete="username"
                        onChange={e => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div style={{
                        background: 'rgba(195,142,13,0.08)',
                        border: '1px solid rgba(195,142,13,0.2)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: '#8a6200',
                    }}>
                        Your email is unverified.{' '}
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            style={{ fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'inherit', color: 'inherit' }}
                        >
                            Resend verification email
                        </Link>
                        {status === 'verification-link-sent' && (
                            <div style={{ marginTop: '0.375rem', color: '#2a7a4b', fontWeight: 500 }}>
                                Verification link sent!
                            </div>
                        )}
                    </div>
                )}

                <SaveRow processing={processing} recentlySuccessful={recentlySuccessful} />
            </form>
        </section>
    );
}

export function SectionHeader({ title, description }) {
    return (
        <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '1rem', marginBottom: '0.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--ink)', margin: '0 0 0.3rem', letterSpacing: '-0.01em' }}>
                {title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', margin: 0, lineHeight: 1.5 }}>{description}</p>
        </div>
    );
}

export function SaveRow({ processing, recentlySuccessful }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
            <PrimaryButton disabled={processing}>
                {processing ? 'Saving…' : 'Save changes'}
            </PrimaryButton>
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: '#2a7a4b', fontWeight: 500 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Saved
                </span>
            </Transition>
        </div>
    );
}
