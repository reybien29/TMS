import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                fontWeight: active ? 600 : 500,
                color: active ? 'var(--ink)' : 'var(--ink-3)',
                background: active ? 'var(--red-subtle)' : 'transparent',
                borderLeft: active ? '3px solid var(--red)' : '3px solid transparent',
                padding: '0.625rem 1rem',
                paddingLeft: active ? 'calc(1rem - 0px)' : '1rem',
                textDecoration: 'none',
                transition: 'background var(--transition), color var(--transition)',
            }}
            onMouseEnter={e => {
                if (!active) {
                    e.currentTarget.style.background = 'var(--surface-2)';
                    e.currentTarget.style.color = 'var(--ink)';
                }
            }}
            onMouseLeave={e => {
                if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--ink-3)';
                }
            }}
            className={className}
        >
            {children}
        </Link>
    );
}
