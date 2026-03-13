import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: active ? 600 : 500,
                color: active ? 'var(--ink)' : 'var(--ink-3)',
                borderBottom: active ? '2px solid var(--red)' : '2px solid transparent',
                paddingBottom: '2px',
                paddingLeft: '0.125rem',
                paddingRight: '0.125rem',
                textDecoration: 'none',
                transition: 'color var(--transition), border-color var(--transition)',
                whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
                if (!active) e.currentTarget.style.color = 'var(--ink)';
            }}
            onMouseLeave={e => {
                if (!active) e.currentTarget.style.color = 'var(--ink-3)';
            }}
            className={className}
        >
            {children}
        </Link>
    );
}
