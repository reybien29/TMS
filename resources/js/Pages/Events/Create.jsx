import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ venues, teams }) {
    const { data, setData, post, processing, errors } = useForm({
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('events.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Create New Event" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Create New Event</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Fill in the details to schedule a new basketball activity.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                    <form onSubmit={handleSubmit} className="p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Basic Info */}
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Event Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                                        placeholder="e.g. Summer League Opening"
                                        required
                                    />
                                    {errors.title && <p className="text-xs text-rose-500 font-bold mt-2 uppercase tracking-tight italic">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Event Type</label>
                                    <select
                                        value={data.event_type}
                                        onChange={e => setData('event_type', e.target.value)}
                                        className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 appearance-none"
                                    >
                                        <option value="game">Game</option>
                                        <option value="practice">Practice</option>
                                        <option value="tournament">Tournament</option>
                                        <option value="meeting">Meeting</option>
                                        <option value="training">Training</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Start Time</label>
                                        <input
                                            type="datetime-local"
                                            value={data.start_time}
                                            onChange={e => setData('start_time', e.target.value)}
                                            className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-gray-900 focus:bg-white transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">End Time</label>
                                        <input
                                            type="datetime-local"
                                            value={data.end_time}
                                            onChange={e => setData('end_time', e.target.value)}
                                            className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-gray-900 focus:bg-white transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Logistics */}
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Venue</label>
                                    <select
                                        value={data.venue_id}
                                        onChange={e => setData('venue_id', e.target.value)}
                                        className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                        required
                                    >
                                        <option value="">Select a venue</option>
                                        {venues.map(venue => (
                                            <option key={venue.id} value={venue.id}>{venue.name.toLowerCase()}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Home Team</label>
                                        <select
                                            value={data.team_id}
                                            onChange={e => setData('team_id', e.target.value)}
                                            className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                        >
                                            <option value="">N/A</option>
                                            {teams.map(team => (
                                                <option key={team.id} value={team.id}>{team.name.toLowerCase()}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Registration Fee</label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xs">$</span>
                                            <input
                                                type="number"
                                                value={data.registration_fee}
                                                onChange={e => setData('registration_fee', e.target.value)}
                                                className="w-full bg-slate-50 border-slate-100 rounded-2xl pl-10 pr-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all h-32 resize-none"
                                        placeholder="Add any additional details or rules..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
                            <Link 
                                href={route('events.index')} 
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Cancel & Return
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
