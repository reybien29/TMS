export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                color: 'var(--red)',
                marginTop: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
            }}
            className={className}
        >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{flexShrink: 0}}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {message}
        </p>
    ) : null;
}
