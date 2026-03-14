import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function EventsCreate({ venues, teams }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        event_type: 'game',
        start_time: '',
        end_time: '',
        status: 'scheduled',
        venue_id: '',
        team_id: '',
        opponent_team_id: '',
        max_participants: '',
        registration_fee: '0',
        event_code: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
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
                        Create Event
                    </h2>
                </div>
            }
        >
            <Head title="Create Event" />

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

                .form-root {
                    font-family: 'DM Sans', sans-serif;
                    color: var(--db-ink);
                    background-color: var(--db-parchment);
                    min-height: 100vh;
                    background-image:
                        radial-gradient(ellipse 60% 40% at 80% 20%, rgba(232,52,26,0.04) 0%, transparent 70%);
                }

                .form-wrap {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2.5rem 1.5rem 4rem;
                }

                .form-card {
                    background: var(--db-card);
                    border: 1px solid var(--db-rule);
                    border-radius: 12px;
                    padding: 2rem;
                    backdrop-filter: blur(8px);
                }

                .form-header {
                    margin-bottom: 2rem;
                }

                .form-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 1.5rem;
                    color: var(--db-ink);
                    letter-spacing: -0.01em;
                    margin: 0 0 0.5rem 0;
                }

                .form-subtitle {
                    color: var(--db-ink-soft);
                    font-size: 0.9rem;
                    margin: 0;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }

                @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr; }
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .form-label {
                    font-size: 0.75rem;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--db-ink-soft);
                }

                .form-input, .form-select, .form-textarea {
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--db-rule);
                    border-radius: 8px;
                    font-size: 0.95rem;
                    background: white;
                    transition: border-color 0.2s;
                    width: 100%;
                }
                .form-input:focus, .form-select:focus, .form-textarea:focus {
                    outline: none;
                    border-color: rgba(232,52,26,0.4);
                    box-shadow: 0 0 0 3px rgba(232,52,26,0.1);
                }

                .form-textarea {
                    min-height: 120px;
                    resize: vertical;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }

                @media (max-width: 768px) {
                    .form-row { grid-template-columns: 1fr; }
                }

                .form-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 2rem;
                    justify-content: flex-end;
                }

                .btn-primary {
                    background: var(--db-red);
                    color: white;
                    border: none;
                    padding: 0.75rem 2rem;
                    border-radius: 8px;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.1s;
                }
                .btn-primary:hover { background: #c52d17; transform: translateY(-1px); }

                .btn-secondary {
                    background: white;
                    color: var(--db-ink);
                    border: 1px solid var(--db-rule);
                    padding: 0.75rem 2rem;
                    border-radius: 8px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                }
                .btn-secondary:hover { background: var(--db-parchment-dark); border-color: rgba(26,22,18,0.2); }

                .error-text {
                    color: #dc2626;
                    font-size: 0.8rem;
                    margin-top: 0.25rem;
                }
            `}</style>

            <div className="form-root">
                <div className="form-wrap">
                    <div className="form-card">
                        <div className="form-header">
                            <h1 className="form-title">Create New Event</h1>
                            <p className="form-subtitle">Fill in the details for your basketball event</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Event Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-input"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.title && <span className="error-text">{errors.title}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Event Type</label>
                                    <select
                                        name="event_type"
                                        className="form-select"
                                        value={formData.event_type}
                                        onChange={handleChange}
                                    >
                                        <option value="game">Game</option>
                                        <option value="practice">Practice</option>
                                        <option value="tournament">Tournament</option>
                                        <option value="meeting">Meeting</option>
                                        <option value="training">Training</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Start Time</label>
                                    <input
                                        type="datetime-local"
                                        name="start_time"
                                        className="form-input"
                                        value={formData.start_time}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.start_time && <span className="error-text">{errors.start_time}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">End Time</label>
                                    <input
                                        type="datetime-local"
                                        name="end_time"
                                        className="form-input"
                                        value={formData.end_time}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.end_time && <span className="error-text">{errors.end_time}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Venue</label>
                                    <select
                                        name="venue_id"
                                        className="form-select"
                                        value={formData.venue_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a venue</option>
                                        {venues.map(venue => (
                                            <option key={venue.id} value={venue.id}>
                                                {venue.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.venue_id && <span className="error-text">{errors.venue_id}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <select
                                        name="status"
                                        className="form-select"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="scheduled">Scheduled</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Team</label>
                                    <select
                                        name="team_id"
                                        className="form-select"
                                        value={formData.team_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a team (optional)</option>
                                        {teams.map(team => (
                                            <option key={team.id} value={team.id}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Opponent Team</label>
                                    <select
                                        name="opponent_team_id"
                                        className="form-select"
                                        value={formData.opponent_team_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select opponent (optional)</option>
                                        {teams.map(team => (
                                            <option key={team.id} value={team.id}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Registration Fee ($)</label>
                                    <input
                                        type="number"
                                        name="registration_fee"
                                        className="form-input"
                                        value={formData.registration_fee}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Max Participants</label>
                                    <input
                                        type="number"
                                        name="max_participants"
                                        className="form-input"
                                        value={formData.max_participants}
                                        onChange={handleChange}
                                        min="1"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Event Code</label>
                                    <input
                                        type="text"
                                        name="event_code"
                                        className="form-input"
                                        value={formData.event_code}
                                        onChange={handleChange}
                                        placeholder="Optional event code"
                                    />
                                </div>
                            </div>

                            <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-textarea"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Event description (optional)"
                                />
                            </div>

                            <div className="form-actions">
                                <Link href="/events" className="btn-secondary">
                                    Cancel
                                </Link>
                                <button type="submit" className="btn-primary">
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
