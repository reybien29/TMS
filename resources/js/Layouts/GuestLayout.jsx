import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--surface)',
            backgroundImage: `
                radial-gradient(ellipse 70% 50% at 50% -5%, rgba(232,52,26,0.06) 0%, transparent 65%),
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 40L40 0M-4 4L4-4M36 44L44 36' stroke='%2318120E' stroke-opacity='0.022' stroke-width='1'/%3E%3C/svg%3E")
            `,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            fontFamily: 'var(--font-sans)',
        }}>
            {/* Logo */}
            <Link
                href="/"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    marginBottom: '2rem',
                }}
            >
                <div style={{
                    width: '3rem', height: '3rem',
                    background: 'var(--red-subtle)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <ApplicationLogo style={{ width: '1.5rem', height: '1.5rem', fill: 'var(--red)' }} />
                </div>
                <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--ink)',
                    letterSpacing: '-0.01em',
                }}>
                    Laravel
                </span>
            </Link>

            {/* Card */}
            <div style={{
                width: '100%',
                maxWidth: '26rem',
                background: 'var(--white)',
                border: '1px solid var(--rule)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                padding: '2rem 2.25rem',
                animation: 'fadeUp 0.4s cubic-bezier(0.4,0,0.2,1) both',
            }}>
                {children}
            </div>

            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
