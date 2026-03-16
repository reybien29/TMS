import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ events, teams }) {
    const { data, setData, post, processing, errors } = useForm({
        event_id: '',
        home_team_id: '',
        away_team_id: '',
        game_time: '',
        location: '',
        referee: '',
        score_home: '',
        score_away: '',
        game_status: 'scheduled',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('schedules.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Schedule New Game" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Schedule New Game</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Define matchup, date, and location for the upcoming game.
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
                                                className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 appearance-none"
                                                required
                                            >
                                                <option value="">Select Event context</option>
                                                {events.map(event => (
                                                    <option key={event.id} value={event.id}>{event.title.toLowerCase()}</option>
                                                ))}
                                            </select>
                                            {errors.event_id && <p className="text-xs text-rose-500 font-bold mt-2 lowercase italic">{errors.event_id}</p>}
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
                                                    <option value="">Home Team</option>
                                                    {teams.map(team => (
                                                        <option key={team.id} value={team.id}>{team.name.toLowerCase()}</option>
                                                    ))}
                                                </select>
                                                {errors.home_team_id && <p className="text-xs text-rose-500 font-bold mt-2 lowercase italic">{errors.home_team_id}</p>}
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Away Team</label>
                                                <select
                                                    value={data.away_team_id}
                                                    onChange={e => setData('away_team_id', e.target.value)}
                                                    className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all appearance-none"
                                                    required
                                                >
                                                    <option value="">Away Team</option>
                                                    {teams.map(team => (
                                                        <option key={team.id} value={team.id}>{team.name.toLowerCase()}</option>
                                                    ))}
                                                </select>
                                                {errors.away_team_id && <p className="text-xs text-rose-500 font-bold mt-2 lowercase italic">{errors.away_team_id}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Game Time</label>
                                    <input
                                        type="datetime-local"
                                        value={data.game_time}
                                        onChange={e => setData('game_time', e.target.value)}
                                        className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                        required
                                    />
                                    {errors.game_time && <p className="text-xs text-rose-500 font-bold mt-2 lowercase italic">{errors.game_time}</p>}
                                </div>
                            </div>

                            {/* Game Logistics */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        Game Details & Status
                                    </h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Location / Court</label>
                                            <input
                                                type="text"
                                                value={data.location}
                                                onChange={e => setData('location', e.target.value)}
                                                className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                                placeholder="e.g. Main Court, Gym B"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
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
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Referee</label>
                                                <input
                                                    type="text"
                                                    value={data.referee}
                                                    onChange={e => setData('referee', e.target.value)}
                                                    className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                                    placeholder="Assigned Ref"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Additional Notes</label>
                                            <textarea
                                                value={data.notes}
                                                onChange={e => setData('notes', e.target.value)}
                                                className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all h-24 resize-none"
                                                placeholder="Game rules, equipment needs, etc."
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
                                Cancel & Discard
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-12 py-5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black uppercase tracking-widest text-[10px] rounded-[20px] shadow-xl shadow-purple-600/20 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Scheduling...' : 'Confirm Schedule'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
