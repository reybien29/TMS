import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ schedule, events, teams }) {
    const { data, setData, put, processing, errors } = useForm({
        event_id: schedule.event_id || '',
        home_team_id: schedule.home_team_id || '',
        away_team_id: schedule.away_team_id || '',
        game_time: schedule.game_time ? new Date(schedule.game_time).toISOString().slice(0, 16) : '',
        location: schedule.location || '',
        referee: schedule.referee || '',
        score_home: schedule.score_home || '',
        score_away: schedule.score_away || '',
        game_status: schedule.game_status || 'scheduled',
        notes: schedule.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('schedules.update', schedule.id));
    };

    return (
        <DashboardLayout>
            <Head title="Edit Game Schedule" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Edit Matchup</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Modify game details, score, or schedule status.
                    </p>
                </div>

                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                    <form onSubmit={handleSubmit} className="p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Matchup Details */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                        Matchup Configuration
                                    </h3>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Parent Event</label>
                                            <select
                                                value={data.event_id}
                                                onChange={e => setData('event_id', e.target.value)}
                                                className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all appearance-none"
                                                required
                                            >
                                                {events.map(event => (
                                                    <option key={event.id} value={event.id}>{event.title.toLowerCase()}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 items-center">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Home Team</label>
                                                <select
                                                    value={data.home_team_id}
                                                    onChange={e => setData('home_team_id', e.target.value)}
                                                    className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all appearance-none"
                                                    required
                                                >
                                                    {teams.map(team => (
                                                        <option key={team.id} value={team.id}>{team.name.toLowerCase()}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Away Team</label>
                                                <select
                                                    value={data.away_team_id}
                                                    onChange={e => setData('away_team_id', e.target.value)}
                                                    className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all appearance-none"
                                                    required
                                                >
                                                    {teams.map(team => (
                                                        <option key={team.id} value={team.id}>{team.name.toLowerCase()}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Game Time</label>
                                        <input
                                            type="datetime-local"
                                            value={data.game_time}
                                            onChange={e => setData('game_time', e.target.value)}
                                            className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-gray-900 focus:bg-white transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Game Status</label>
                                        <select
                                            value={data.game_status}
                                            onChange={e => setData('game_status', e.target.value)}
                                            className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all appearance-none"
                                        >
                                            <option value="scheduled">Scheduled</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="postponed">Postponed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Scoring & Notes */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        Results & Extra Info
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Score (Home)</label>
                                                <input
                                                    type="text"
                                                    value={data.score_home}
                                                    onChange={e => setData('score_home', e.target.value)}
                                                    className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Score (Away)</label>
                                                <input
                                                    type="text"
                                                    value={data.score_away}
                                                    onChange={e => setData('score_away', e.target.value)}
                                                    className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Location</label>
                                            <input
                                                type="text"
                                                value={data.location}
                                                onChange={e => setData('location', e.target.value)}
                                                className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Notes</label>
                                            <textarea
                                                value={data.notes}
                                                onChange={e => setData('notes', e.target.value)}
                                                className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all h-24 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between">
                            <Link 
                                href={route('schedules.index')} 
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Discard Changes
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] rounded-[20px] shadow-xl shadow-emerald-600/20 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Save Match Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
