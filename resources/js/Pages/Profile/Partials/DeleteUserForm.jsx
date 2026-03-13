import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { SectionHeader } from './UpdateProfileInformationForm';

export default function DeleteUserForm({ className = '' }) {
    const [confirming, setConfirming] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirming(false);
        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            <SectionHeader
                title="Delete account"
                description="Permanently delete your account and all associated data. This action cannot be undone."
            />

            <div style={{ marginTop: '1.5rem' }}>
                <DangerButton onClick={() => setConfirming(true)}>
                    Delete account
                </DangerButton>
            </div>

            <Modal show={confirming} onClose={closeModal} maxWidth="md">
                <div style={{ padding: '2rem' }}>
                    {/* Warning icon */}
                    <div style={{
                        width: '3rem', height: '3rem',
                        background: 'rgba(232,52,26,0.1)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1.25rem',
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--ink)', letterSpacing: '-0.01em', margin: '0 0 0.5rem' }}>
                        Delete your account?
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                        This will permanently delete all your data. Enter your password to confirm.
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <InputLabel htmlFor="delete-password" value="Your password" />
                        <TextInput
                            id="delete-password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            isFocused
                            placeholder="Enter your password"
                            onChange={e => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton onClick={deleteUser} disabled={processing}>
                            {processing ? 'Deleting…' : 'Delete account'}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
