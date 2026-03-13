import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

export default function Modal({ children, show = false, maxWidth = '2xl', closeable = true, onClose = () => {} }) {
    const close = () => { if (closeable) onClose(); };

    const maxWidthMap = {
        sm: '24rem', md: '28rem', lg: '32rem', xl: '36rem', '2xl': '42rem',
    };

    return (
        <Transition show={show} leave="duration-150">
            <Dialog as="div" id="modal" className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8" onClose={close}>
                {/* Backdrop */}
                <TransitionChild
                    enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(24,18,14,0.55)', backdropFilter: 'blur(2px)' }} />
                </TransitionChild>

                {/* Panel */}
                <TransitionChild
                    enter="ease-out duration-200" enterFrom="opacity-0 scale-95 translate-y-2" enterTo="opacity-100 scale-100 translate-y-0"
                    leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                >
                    <DialogPanel
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: maxWidthMap[maxWidth] || '42rem',
                            background: 'var(--white)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--rule)',
                            boxShadow: 'var(--shadow-lg)',
                            overflow: 'hidden',
                        }}
                    >
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
