import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { SectionHeader, SaveRow } from './UpdateProfileInformationForm';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput        = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <SectionHeader
                title="Update password"
                description="Use a long, random password to keep your account secure."
            />

            <form onSubmit={updatePassword} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                <div>
                    <InputLabel htmlFor="current_password" value="Current password" />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        autoComplete="current-password"
                        onChange={e => setData('current_password', e.target.value)}
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New password" />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        type="password"
                        value={data.password}
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
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={e => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <SaveRow processing={processing} recentlySuccessful={recentlySuccessful} />
            </form>
        </section>
    );
}
