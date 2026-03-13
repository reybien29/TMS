export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            style={{
                width: '1rem',
                height: '1rem',
                borderRadius: '3px',
                border: '1.5px solid var(--rule-strong)',
                background: 'var(--white)',
                accentColor: 'var(--red)',
                cursor: 'pointer',
                flexShrink: 0,
            }}
            className={className}
        />
    );
}
