import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    const stats = [
        { label: 'Projects', value: '12', delta: '+2 this month', up: true },
        { label: 'Deployments', value: '48', delta: '+7 this week', up: true },
        { label: 'Uptime', value: '99.9%', delta: 'Last 30 days', up: true },
        { label: 'Errors', value: '3', delta: '-12 vs last week', up: false },
    ];

    const activity = [
        { action: 'Deployed', target: 'main branch', time: '2 min ago', type: 'deploy' },
        { action: 'Migration ran', target: 'users table updated', time: '1 hr ago', type: 'db' },
        { action: 'Queue processed', target: '204 jobs completed', time: '3 hr ago', type: 'queue' },
        { action: 'Cache cleared', target: 'All stores flushed', time: '5 hr ago', type: 'cache' },
    ];

    const quickLinks = [
        { label: 'Documentation', href: 'https://laravel.com/docs', icon: 'docs' },
        { label: 'Laracasts', href: 'https://laracasts.com', icon: 'video' },
        { label: 'Laravel News', href: 'https://laravel-news.com', icon: 'news' },
        { label: 'Forge', href: 'https://forge.laravel.com', icon: 'server' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '6px',
                        height: '24px',
                        background: 'var(--db-red)',
                        borderRadius: '3px',
                        flexShrink: 0,
                    }} />
                    <h2 style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: '1.35rem',
                        fontWeight: 400,
                        color: 'var(--db-ink)',
                        letterSpacing: '-0.01em',
                        margin: 0,
                    }}>
                        Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

                :root {
                    --db-red: #E8341A;
                    --db-ink: #1A1612;
                    --db-ink-soft: #5a5450;
                    --db-parchment: #F7F4EF;
                    --db-parchment-dark: #EDE9E3;
                    --db-rule: rgba(26,22,18,0.1);
                    --db-card: rgba(255,255,255,0.85);
                }

                .db-root {
                    font-family: 'DM Sans', sans-serif;
                    color: var(--db-ink);
                    background-color: var(--db-parchment);
                    min-height: 100vh;
                    background-image:
                        radial-gradient(ellipse 60% 40% at 80% 20%, rgba(232,52,26,0.04) 0%, transparent 70%);
                }

                .db-wrap {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2.5rem 1.5rem 4rem;
                }

                /* Welcome banner */
                .db-banner {
                    background: var(--db-ink);
                    border-radius: 12px;
                    padding: 2rem 2.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    position: relative;
                    overflow: hidden;
                }

                .db-banner::before {
                    content: '';
                    position: absolute;
                    top: -40px; right: -40px;
                    width: 200px; height: 200px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(232,52,26,0.3) 0%, transparent 70%);
                }

                .db-banner-greeting {
                    font-size: 0.75rem;
                    font-weight: 500;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: var(--db-red);
                    margin-bottom: 0.4rem;
                }

                .db-banner-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 1.75rem;
                    color: #F7F4EF;
                    letter-spacing: -0.01em;
                    margin: 0 0 0.5rem;
                    position: relative;
                }

                .db-banner-sub {
                    font-size: 0.875rem;
                    color: rgba(247,244,239,0.5);
                    font-weight: 300;
                }

                .db-banner-badge {
                    flex-shrink: 0;
                    background: rgba(232,52,26,0.15);
                    border: 1px solid rgba(232,52,26,0.3);
                    border-radius: 50px;
                    padding: 0.5rem 1.25rem;
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: #ff8f7f;
                    letter-spacing: 0.04em;
                    white-space: nowrap;
                    position: relative;
                }

                /* Stats grid */
                .db-stats {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                @media (max-width: 900px) { .db-stats { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 500px) { .db-stats { grid-template-columns: 1fr; } }

                .db-stat {
                    background: var(--db-card);
                    border: 1px solid var(--db-rule);
                    border-radius: 10px;
                    padding: 1.5rem;
                    backdrop-filter: blur(8px);
                    transition: border-color 0.2s, box-shadow 0.2s;
                }

                .db-stat:hover {
                    border-color: rgba(232,52,26,0.2);
                    box-shadow: 0 4px 20px rgba(26,22,18,0.06);
                }

                .db-stat-label {
                    font-size: 0.75rem;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--db-ink-soft);
                    margin-bottom: 0.75rem;
                }

                .db-stat-value {
                    font-family: 'DM Serif Display', serif;
                    font-size: 2.25rem;
                    color: var(--db-ink);
                    line-height: 1;
                    margin-bottom: 0.5rem;
                }

                .db-stat-delta {
                    font-size: 0.78rem;
                    font-weight: 400;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }

                .db-stat-delta.up { color: #2a7a4b; }
                .db-stat-delta.down { color: var(--db-red); }

                /* Main content grid */
                .db-grid {
                    display: grid;
                    grid-template-columns: 1fr 320px;
                    gap: 1.5rem;
                }

                @media (max-width: 900px) { .db-grid { grid-template-columns: 1fr; } }

                /* Panels */
                .db-panel {
                    background: var(--db-card);
                    border: 1px solid var(--db-rule);
                    border-radius: 10px;
                    padding: 1.75rem 2rem;
                    backdrop-filter: blur(8px);
                }

                .db-panel-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid var(--db-rule);
                }

                .db-panel-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 1.1rem;
                    color: var(--db-ink);
                    letter-spacing: -0.01em;
                }

                .db-panel-action {
                    font-size: 0.78rem;
                    font-weight: 500;
                    color: var(--db-red);
                    text-decoration: none;
                    letter-spacing: 0.04em;
                    transition: opacity 0.15s;
                }
                .db-panel-action:hover { opacity: 0.7; }

                /* Activity list */
                .db-activity-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.9rem 0;
                    border-bottom: 1px solid var(--db-rule);
                    transition: background 0.15s;
                    border-radius: 4px;
                    margin: 0 -0.5rem;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                .db-activity-item:last-child { border-bottom: none; }
                .db-activity-item:hover { background: rgba(26,22,18,0.02); }

                .db-activity-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .dot-deploy { background: var(--db-red); }
                .dot-db { background: #2a7a4b; }
                .dot-queue { background: #5b63d3; }
                .dot-cache { background: #c07a20; }

                .db-activity-content { flex: 1; min-width: 0; }

                .db-activity-action {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--db-ink);
                }

                .db-activity-target {
                    font-size: 0.8rem;
                    color: var(--db-ink-soft);
                    font-weight: 300;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .db-activity-time {
                    font-size: 0.75rem;
                    color: var(--db-ink-soft);
                    opacity: 0.6;
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                /* Quick links */
                .db-links { display: flex; flex-direction: column; gap: 0.75rem; }

                .db-link {
                    display: flex;
                    align-items: center;
                    gap: 0.875rem;
                    padding: 0.875rem 1rem;
                    border: 1px solid var(--db-rule);
                    border-radius: 8px;
                    text-decoration: none;
                    color: var(--db-ink);
                    background: var(--db-parchment);
                    transition: border-color 0.2s, background 0.2s, transform 0.15s;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                .db-link:hover {
                    border-color: rgba(232,52,26,0.25);
                    background: rgba(255,255,255,0.9);
                    transform: translateX(2px);
                    color: var(--db-red);
                }

                .db-link-icon {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 6px;
                    background: var(--db-rule);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: background 0.2s;
                }
                .db-link:hover .db-link-icon { background: rgba(232,52,26,0.1); }

                .db-link-icon svg {
                    width: 1rem; height: 1rem;
                    color: var(--db-ink-soft);
                    transition: color 0.2s;
                }
                .db-link:hover .db-link-icon svg { color: var(--db-red); }

                .db-link-arrow {
                    margin-left: auto;
                    color: var(--db-ink-soft);
                    opacity: 0.35;
                    transition: opacity 0.2s, transform 0.2s;
                }
                .db-link:hover .db-link-arrow { opacity: 1; transform: translateX(2px); }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .ai { animation: fadeUp 0.5s ease both; }
                .d1 { animation-delay: 0.05s; }
                .d2 { animation-delay: 0.12s; }
                .d3 { animation-delay: 0.2s; }
                .d4 { animation-delay: 0.28s; }
            `}</style>

            <div className="db-root">
                <div className="db-wrap">

                    {/* Banner */}
                    <div className="db-banner ai d1">
                        <div>
                            <div className="db-banner-greeting">Welcome back</div>
                            <h1 className="db-banner-title">You're logged in!</h1>
                            <p className="db-banner-sub">Everything looks good. Your application is running smoothly.</p>
                        </div>
                        <div className="db-banner-badge">● Live</div>
                    </div>

                    {/* Stats */}
                    <div className="db-stats ai d2">
                        {stats.map((s) => (
                            <div key={s.label} className="db-stat">
                                <div className="db-stat-label">{s.label}</div>
                                <div className="db-stat-value">{s.value}</div>
                                <div className={`db-stat-delta ${s.up ? 'up' : 'down'}`}>
                                    <span>{s.up ? '↑' : '↓'}</span>
                                    <span>{s.delta}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main grid */}
                    <div className="db-grid">
                        {/* Activity */}
                        <div className="db-panel ai d3">
                            <div className="db-panel-header">
                                <h2 className="db-panel-title">Recent Activity</h2>
                                <a href="#" className="db-panel-action">View all →</a>
                            </div>
                            {activity.map((item, i) => (
                                <div key={i} className="db-activity-item">
                                    <div className={`db-activity-dot dot-${item.type}`} />
                                    <div className="db-activity-content">
                                        <div className="db-activity-action">{item.action}</div>
                                        <div className="db-activity-target">{item.target}</div>
                                    </div>
                                    <div className="db-activity-time">{item.time}</div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Links */}
                        <div className="db-panel ai d4">
                            <div className="db-panel-header">
                                <h2 className="db-panel-title">Quick Links</h2>
                            </div>
                            <div className="db-links">
                                {quickLinks.map((link) => (
                                    <a key={link.label} href={link.href} className="db-link" target="_blank" rel="noreferrer">
                                        <div className="db-link-icon">
                                            {link.icon === 'docs' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                                                </svg>
                                            )}
                                            {link.icon === 'video' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                                    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                                                </svg>
                                            )}
                                            {link.icon === 'news' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                                                </svg>
                                            )}
                                            {link.icon === 'server' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
                                                </svg>
                                            )}
                                        </div>
                                        {link.label}
                                        <svg className="db-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
