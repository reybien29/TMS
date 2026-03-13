export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label
            {...props}
            style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
                color: 'var(--ink-2)',
                marginBottom: '0.375rem',
            }}
            className={className}
        >
            {value ? value : children}
        </label>
    );
}
