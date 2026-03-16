import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ event }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <DashboardLayout>
            <Head title={`Event Details: ${event.title}`} />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-100">
                                {event.event_type}
                            </span>
                            <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border ${
                                event.status === 'scheduled' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                            }`}>
                                {event.status}
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tight capitalize">{event.title.toLowerCase()}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link 
                            href={route('events.edit', event.id)}
                            className="px-6 py-3 bg-white border border-slate-100 text-slate-600 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all text-sm"
                        >
                            Edit Event
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Description</h3>
                            <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                                {event.description || 'No description provided for this event.'}
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Maximum Capacity</h3>
                                <p className="text-2xl font-black text-gray-900">{event.max_participants || 'Unlimited'}</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Registration Fee</h3>
                                <p className="text-2xl font-black text-gray-900">${event.registration_fee || '0.00'}</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Event Code</h3>
                                <p className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{event.event_code || '---'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Meta Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-[#0a0f1c] text-white rounded-3xl p-8 shadow-xl">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">When</h3>
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                        <div>
                                            <p className="font-bold text-sm capitalize">{formatDate(event.start_time).toLowerCase()}</p>
                                            <p className="text-slate-400 text-xs mt-1">{formatTime(event.start_time).toLowerCase()} — {formatTime(event.end_time).toLowerCase()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Where</h3>
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                        <div>
                                            <p className="font-bold text-sm capitalize">{event.venue?.name.toLowerCase() || 'unassigned location'}</p>
                                            <p className="text-slate-400 text-xs mt-1 truncate max-w-[180px]">{event.venue?.location.toLowerCase() || 'no address available'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Teams Involved</h3>
                                    <div className="flex items-center gap-3">
                                         <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl">🏀</div>
                                         <div>
                                            <p className="font-bold text-sm capitalize">{event.team?.name.toLowerCase() || 'open registration'}</p>
                                            {event.opponent_team && (
                                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">vs {event.opponent_team.name.toLowerCase()}</p>
                                            )}
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Organizer</p>
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm">
                                     {event.user?.name.charAt(0)}
                                 </div>
                                 <div>
                                     <p className="text-sm font-bold text-gray-900 capitalize">{event.user?.name.toLowerCase()}</p>
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">system admin</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
