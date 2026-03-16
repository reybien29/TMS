import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ event, venues, teams }) {
    const { data, setData, put, processing, errors } = useForm({
        title: event.title || '',
        description: event.description || '',
        event_type: event.event_type || 'game',
        start_time: event.start_time ? new Date(event.start_time).toISOString().slice(0, 16) : '',
        end_time: event.end_time ? new Date(event.end_time).toISOString().slice(0, 16) : '',
        status: event.status || 'scheduled',
        venue_id: event.venue_id || '',
        team_id: event.team_id || '',
        opponent_team_id: event.opponent_team_id || '',
        max_participants: event.max_participants || '',
        registration_fee: event.registration_fee || '0',
        event_code: event.event_code || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('events.update', event.id));
    };

    return (
        <DashboardLayout>
            <Head title={`Edit Event: ${event.title}`} />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight capitalize">Edit: {event.title.toLowerCase()}</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Update the event details and preferences.
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
                                        required
                                    />
                                    {errors.title && <p className="text-xs text-rose-500 font-bold mt-2 uppercase tracking-tight italic">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all appearance-none"
                                    >
                                        <option value="scheduled">Scheduled</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
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

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all h-32 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
                            <Link 
                                href={route('events.index')} 
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Discard Changes
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
