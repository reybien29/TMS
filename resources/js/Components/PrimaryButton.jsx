export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: 'var(--ink)',
                color: 'var(--surface)',
                border: '1.5px solid var(--ink)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5625rem 1.125rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.45 : 1,
                transition: 'background var(--transition), border-color var(--transition), box-shadow var(--transition), transform var(--transition)',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
            }}
            onMouseEnter={e => {
                if (!disabled) {
                    e.currentTarget.style.background = 'var(--red)';
                    e.currentTarget.style.borderColor = 'var(--red)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--red-subtle)';
                }
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--ink)';
                e.currentTarget.style.borderColor = 'var(--ink)';
                e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            disabled={disabled}
            className={className}
        >
            {children}
        </button>
    );
}
