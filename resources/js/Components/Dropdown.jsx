import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, useContext, useState } from 'react';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(prev => !prev);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div style={{ position: 'relative' }}>{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);
    return (
        <>
            <div onClick={toggleOpen}>{children}</div>
            {open && (
                <div
                    style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
};

const Content = ({ align = 'right', width = '48', children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    const alignStyle = align === 'left'
        ? { left: 0, transformOrigin: 'top left' }
        : { right: 0, transformOrigin: 'top right' };

    const widthStyle = width === '48' ? { width: '12rem' } : {};

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                style={{
                    position: 'absolute',
                    zIndex: 50,
                    marginTop: '0.5rem',
                    background: 'var(--white)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--rule)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.375rem',
                    ...alignStyle,
                    ...widthStyle,
                }}
                onClick={() => setOpen(false)}
            >
                {children}
            </div>
        </Transition>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => (
    <Link
        {...props}
        style={{
            display: 'block',
            width: '100%',
            padding: '0.5rem 0.75rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 400,
            color: 'var(--ink-2)',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            transition: 'background var(--transition), color var(--transition)',
        }}
        onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--surface-2)';
            e.currentTarget.style.color = 'var(--ink)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--ink-2)';
        }}
        className={className}
    >
        {children}
    </Link>
);

Dropdown.Trigger  = Trigger;
Dropdown.Content  = Content;
Dropdown.Link     = DropdownLink;

export default Dropdown;
