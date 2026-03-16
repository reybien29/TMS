import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--surface)', fontFamily: 'var(--font-sans)' }}>

            {/* ── Top Nav ── */}
            <nav style={{
                background: 'var(--white)',
                borderBottom: '1px solid var(--rule)',
                position: 'sticky',
                top: 0,
                zIndex: 30,
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <div style={{ display: 'flex', height: '3.75rem', alignItems: 'center', justifyContent: 'space-between' }}>

                        {/* Left: logo + nav links */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0 }}>
                                <ApplicationLogo style={{ height: '1.75rem', width: 'auto', color: 'var(--red)', fill: 'currentColor' }} />
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                                    TMS
                                </span>
                            </Link>

                            {/* Desktop nav links */}
                            <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="sm-flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('events.index')} active={route().current('events.*')}>
                                    Events
                                </NavLink>
                                <NavLink href={route('venues.index')} active={route().current('venues.*')}>
                                    Venues
                                </NavLink>
                                <NavLink href={route('teams.index')} active={route().current('teams.*')}>
                                    Teams
                                </NavLink>
                                <NavLink href={route('players.index')} active={route().current('players.*')}>
                                    Players
                                </NavLink>
                                <NavLink href={route('schedules.index')} active={route().current('schedules.*')}>
                                    Schedules
                                </NavLink>
                            </div>
                        </div>

                        {/* Right: role badge + user dropdown */}
                        <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="sm-flex">

                            {/* Role badge */}
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                padding: '0.25rem 0.6rem',
                                borderRadius: '9999px',
                                background: user.isAdmin
                                    ? 'rgba(232,52,26,0.1)'
                                    : 'rgba(24,18,14,0.06)',
                                color: user.isAdmin ? 'var(--red)' : 'var(--ink-3)',
                                border: user.isAdmin
                                    ? '1px solid rgba(232,52,26,0.2)'
                                    : '1px solid var(--rule)',
                            }}>
                                {user.isAdmin ? (
                                    <>
                                        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                        Admin
                                    </>
                                ) : 'User'}
                            </span>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            color: 'var(--ink-2)',
                                            background: 'transparent',
                                            border: '1.5px solid var(--rule-strong)',
                                            borderRadius: 'var(--radius-sm)',
                                            padding: '0.4rem 0.75rem',
                                            cursor: 'pointer',
                                            transition: 'background var(--transition), border-color var(--transition)',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = 'var(--surface-2)';
                                            e.currentTarget.style.borderColor = 'var(--ink-4)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = 'var(--rule-strong)';
                                        }}
                                    >
                                        <span style={{
                                            width: '1.5rem', height: '1.5rem',
                                            borderRadius: '50%',
                                            background: user.isAdmin ? 'rgba(232,52,26,0.12)' : 'var(--red-subtle)',
                                            color: 'var(--red)',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                        {user.name}
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.5 }}>
                                            <polyline points="6 9 12 15 18 9"/>
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <div style={{ padding: '0.5rem 0.75rem 0.375rem', borderBottom: '1px solid var(--rule)', marginBottom: '0.25rem' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.1rem' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--ink-4)' }}>{user.email}</div>
                                    </div>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" style={{ color: 'var(--red)', fontWeight: 500 }}>
                                        Sign out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileOpen(v => !v)}
                            className="sm-hidden"
                            style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                width: '2.25rem', height: '2.25rem',
                                background: 'transparent',
                                border: '1.5px solid var(--rule-strong)',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                color: 'var(--ink-3)',
                            }}
                        >
                            {mobileOpen ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div style={{ borderTop: '1px solid var(--rule)', background: 'var(--white)' }}>
                        <div style={{ padding: '0.5rem 0' }}>
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('events.index')} active={route().current('events.*')}>Events</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('venues.index')} active={route().current('venues.*')}>Venues</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('teams.index')} active={route().current('teams.*')}>Teams</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('players.index')} active={route().current('players.*')}>Players</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('schedules.index')} active={route().current('schedules.*')}>Schedules</ResponsiveNavLink>
                        </div>
                        <div style={{ borderTop: '1px solid var(--rule)', padding: '0.75rem 1rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>{user.name}</div>
                                <span style={{
                                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                                    textTransform: 'uppercase', padding: '0.15rem 0.45rem',
                                    borderRadius: '9999px',
                                    background: user.isAdmin ? 'rgba(232,52,26,0.1)' : 'rgba(24,18,14,0.06)',
                                    color: user.isAdmin ? 'var(--red)' : 'var(--ink-4)',
                                }}>
                                    {user.isAdmin ? 'Admin' : 'User'}
                                </span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--ink-4)', marginBottom: '0.75rem' }}>{user.email}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('logout')} method="post" as="button">Sign out</ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* ── Flash messages ── */}
            {flash?.success && (
                <div style={{
                    background: 'rgba(42,122,75,0.08)',
                    borderBottom: '1px solid rgba(42,122,75,0.2)',
                    padding: '0.75rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#2a7a4b',
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div style={{
                    background: 'rgba(232,52,26,0.08)',
                    borderBottom: '1px solid rgba(232,52,26,0.2)',
                    padding: '0.75rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--red)',
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {flash.error}
                </div>
            )}

            {/* ── Page header ── */}
            {header && (
                <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--rule)' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.25rem 1.5rem' }}>
                        {header}
                    </div>
                </div>
            )}

            <main>{children}</main>

            <style>{`
                @media (min-width: 640px) {
                    .sm-flex   { display: flex !important; }
                    .sm-hidden { display: none !important; }
                }
            `}</style>
        </div>
    );
}
