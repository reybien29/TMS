import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function EventsIndex({ events, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [eventType, setEventType] = useState(filters.event_type || '');
    const [status, setStatus] = useState(filters.status || '');

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getEventTypeIcon = (type) => {
        switch (type) {
            case 'game': return '🏀';
            case 'practice': return '🏃‍♂️';
            case 'tournament': return '🏆';
            case 'meeting': return '👥';
            case 'training': return '🎓';
            default: return '📅';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '6px',
                        height: '24px',
                        background: '#E8341A',
                        borderRadius: '3px',
                        flexShrink: 0,
                    }} />
                    <h2 style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: '1.35rem',
                        fontWeight: 400,
                        color: '#1A1612',
                        letterSpacing: '-0.01em',
                        margin: 0,
                    }}>
                        Events
                    </h2>
                </div>
            }
        >
            <Head title="Events" />

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

                .events-root {
                    font-family: 'DM Sans', sans-serif;
                    color: var(--db-ink);
                    background-color: var(--db-parchment);
                    min-height: 100vh;
                    background-image:
                        radial-gradient(ellipse 60% 40% at 80% 20%, rgba(232,52,26,0.04) 0%, transparent 70%);
                }

                .events-wrap {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2.5rem 1.5rem 4rem;
                }

                .events-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    gap: 1rem;
                }

                .events-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 1.75rem;
                    color: var(--db-ink);
                    letter-spacing: -0.01em;
                    margin: 0;
                }

                .events-actions {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .btn-primary {
                    background: var(--db-red);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.1s;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .btn-primary:hover { background: #c52d17; transform: translateY(-1px); }

                .btn-secondary {
                    background: white;
                    color: var(--db-ink);
                    border: 1px solid var(--db-rule);
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                }
                .btn-secondary:hover { background: var(--db-parchment-dark); border-color: rgba(26,22,18,0.2); }

                .filters {
                    background: var(--db-card);
                    border: 1px solid var(--db-rule);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    backdrop-filter: blur(8px);
                }

                .filters-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }

                @media (max-width: 900px) {
                    .filters-grid { grid-template-columns: 1fr; }
                    .events-header { flex-direction: column; align-items: flex-start; }
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .input-group label {
                    font-size: 0.75rem;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--db-ink-soft);
                }

                .input-field {
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--db-rule);
                    border-radius: 8px;
                    font-size: 0.95rem;
                    background: white;
                    transition: border-color 0.2s;
                }
                .input-field:focus {
                    outline: none;
                    border-color: rgba(232,52,26,0.4);
                    box-shadow: 0 0 0 3px rgba(232,52,26,0.1);
                }

                .select-field {
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--db-rule);
                    border-radius: 8px;
                    font-size: 0.95rem;
                    background: white;
                    cursor: pointer;
                    transition: border-color 0.2s;
                }
                .select-field:focus {
                    outline: none;
                    border-color: rgba(232,52,26,0.4);
                    box-shadow: 0 0 0 3px rgba(232,52,26,0.1);
                }

                .events-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 1.5rem;
                }

                .event-card {
                    background: var(--db-card);
                    border: 1px solid var(--db-rule);
                    border-radius: 12px;
                    padding: 1.5rem;
                    transition: all 0.2s;
                    backdrop-filter: blur(8px);
                }
                .event-card:hover {
                    border-color: rgba(232,52,26,0.2);
                    box-shadow: 0 8px 25px rgba(26,22,18,0.08);
                    transform: translateY(-2px);
                }

                .event-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .event-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 1.1rem;
                    color: var(--db-ink);
                    letter-spacing: -0.01em;
                    margin: 0;
                    line-height: 1.2;
                }

                .event-type {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: var(--db-ink-soft);
                    font-weight: 500;
                }

                .event-meta {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                @media (max-width: 600px) {
                    .event-meta { grid-template-columns: 1fr; }
                }

                .meta-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .meta-label {
                    font-size: 0.7rem;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--db-ink-soft);
                }

                .meta-value {
                    font-size: 0.9rem;
                    color: var(--db-ink);
                    font-weight: 500;
                }

                .event-actions {
                    display: flex;
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .btn-sm {
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    text-decoration: none;
                    border: 1px solid var(--db-rule);
                    background: white;
                    color: var(--db-ink);
                    transition: all 0.2s;
                }
                .btn-sm:hover { background: var(--db-parchment-dark); border-color: rgba(26,22,18,0.2); }

                .btn-danger {
                    background: #fee2e2;
                    color: #dc2626;
                    border-color: #fecaca;
                }
                .btn-danger:hover { background: #fecaca; }

                .status-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .pagination {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 2rem;
                }

                .pagination a {
                    padding: 0.5rem 0.75rem;
                    border: 1px solid var(--db-rule);
                    border-radius: 6px;
                    color: var(--db-ink);
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .pagination a:hover { background: var(--db-parchment-dark); border-color: rgba(26,22,18,0.2); }
                .pagination .current { background: var(--db-red); color: white; border-color: var(--db-red); }
            `}</style>

            <div className="events-root">
                <div className="events-wrap">
                    <div className="events-header">
                        <h1 className="events-title">Event Management</h1>
                        <div className="events-actions">
                            <Link href="/events/create" className="btn-primary">
                                <span>+</span>
                                <span>Create Event</span>
                            </Link>
                            <Link href="/dashboard" className="btn-secondary">
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="filters">
                        <div className="filters-grid">
                            <div className="input-group">
                                <label>Search Events</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Search by title..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Event Type</label>
                                <select
                                    className="select-field"
                                    value={eventType}
                                    onChange={(e) => setEventType(e.target.value)}
                                >
                                    <option value="">All Types</option>
                                    <option value="game">Game</option>
                                    <option value="practice">Practice</option>
                                    <option value="tournament">Tournament</option>
                                    <option value="meeting">Meeting</option>
                                    <option value="training">Training</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Status</label>
                                <select
                                    className="select-field"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="events-grid">
                        {events.data.map((event) => (
                            <div key={event.id} className="event-card">
                                <div className="event-header">
                                    <div>
                                        <h3 className="event-title">{event.title}</h3>
                                        <div className="event-type">
                                            <span>{getEventTypeIcon(event.event_type)}</span>
                                            <span>{event.event_type.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                    <span className={`status-badge ${getStatusColor(event.status)}`}>
                                        {event.status}
                                    </span>
                                </div>

                                <div className="event-meta">
                                    <div className="meta-item">
                                        <span className="meta-label">Date & Time</span>
                                        <span className="meta-value">
                                            {formatDateTime(event.start_time)} - {formatDateTime(event.end_time)}
                                        </span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Venue</span>
                                        <span className="meta-value">{event.venue?.name || 'TBD'}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Team</span>
                                        <span className="meta-value">{event.team?.name || 'TBD'}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Fee</span>
                                        <span className="meta-value">${event.registration_fee}</span>
                                    </div>
                                </div>

                                {event.description && (
                                    <div style={{ marginBottom: '1rem', color: '#5a5450', fontSize: '0.9rem' }}>
                                        {event.description}
                                    </div>
                                )}

                                <div className="event-actions">
                                    <Link href={`/events/${event.id}`} className="btn-sm">
                                        View Details
                                    </Link>
                                    <Link href={`/events/${event.id}/edit`} className="btn-sm">
                                        Edit
                                    </Link>
                                    <button className="btn-sm btn-danger" onClick={() => {
                                        if (confirm('Are you sure you want to delete this event?')) {
                                            // Handle delete
                                        }
                                    }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {events.links.length > 3 && (
                        <div className="pagination">
                            {events.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className={link.active ? 'current' : ''}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
