import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) localRef.current?.focus();
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            ref={localRef}
            style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                color: 'var(--ink)',
                background: 'var(--white)',
                border: '1.5px solid var(--rule-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.625rem 0.875rem',
                width: '100%',
                transition: 'border-color var(--transition), box-shadow var(--transition)',
                outline: 'none',
            }}
            onFocus={e => {
                e.currentTarget.style.borderColor = 'var(--ink)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--red-subtle)';
            }}
            onBlur={e => {
                e.currentTarget.style.borderColor = 'var(--rule-strong)';
                e.currentTarget.style.boxShadow = 'none';
            }}
            className={className}
        />
    );
});
