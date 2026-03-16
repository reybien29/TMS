import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ events, teams, players, event_id }) {
    const { data, setData, post, processing, errors } = useForm({
        event_id: event_id || '',
        player_id: '',
        team_id: '',
        payment_status: 'pending',
        payment_amount: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('registrations.store'));
    };

    // Auto-fill payment amount if event is selected
    const handleEventChange = (e) => {
        const selectedEventId = e.target.value;
        setData('event_id', selectedEventId);
        const event = events.find(ev => ev.id == selectedEventId);
        if (event) {
            setData('payment_amount', event.registration_fee || 0);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Event Registration" />

            <div className="max-w-[800px]">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Event Registration</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Complete your enrollment for the upcoming basketball events.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-8 text-sm">
                    {/* Event Selection */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Select Event</label>
                        <select
                            value={data.event_id}
                            onChange={handleEventChange}
                            className={`w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition-all duration-300 font-bold text-slate-700 ${errors.event_id ? 'ring-2 ring-rose-500/20' : ''}`}
                        >
                            <option value="">Choose an event...</option>
                            {events.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {event.title.toLowerCase()} - ${event.registration_fee}
                                </option>
                            ))}
                        </select>
                        {errors.event_id && <p className="text-rose-500 text-xs font-bold mt-1 text-[10px] uppercase tracking-wider">{errors.event_id}</p>}
                    </div>

                    {/* Player Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Select Player</label>
                            <select
                                value={data.player_id}
                                onChange={(e) => setData('player_id', e.target.value)}
                                className={`w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition-all duration-300 font-bold text-slate-700 ${errors.player_id ? 'ring-2 ring-rose-500/20' : ''}`}
                            >
                                <option value="">Choose a player...</option>
                                {players.map((player) => (
                                    <option key={player.id} value={player.id}>
                                        {player.first_name} {player.last_name}
                                    </option>
                                ))}
                            </select>
                            {errors.player_id && <p className="text-rose-500 text-xs font-bold mt-1 text-[10px] uppercase tracking-wider">{errors.player_id}</p>}
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Select Team</label>
                            <select
                                value={data.team_id}
                                onChange={(e) => setData('team_id', e.target.value)}
                                className={`w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition-all duration-300 font-bold text-slate-700 ${errors.team_id ? 'ring-2 ring-rose-500/20' : ''}`}
                            >
                                <option value="">Choose a team...</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name.toLowerCase()}
                                    </option>
                                ))}
                            </select>
                            {errors.team_id && <p className="text-rose-500 text-xs font-bold mt-1 text-[10px] uppercase tracking-wider">{errors.team_id}</p>}
                        </div>
                    </div>

                    {/* Payment Info (Read-only for now) */}
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Total Fee</p>
                            <p className="text-2xl font-black text-slate-900">${data.payment_amount}</p>
                        </div>
                        <div className="text-right text-slate-400">
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 text-slate-300">Default Status</p>
                            <p className="text-sm font-bold uppercase tracking-widest">Pending Payment</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-600/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100"
                        >
                            {processing ? 'Processing...' : 'Complete Registration'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
