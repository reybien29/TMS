import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const safe = (str) => str?.toLowerCase() ?? '';

export default function Show({ venue }) {
    return (
        <DashboardLayout>
            <Head title={`Venue: ${venue?.name || 'Loading...'}`} />

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-emerald-200">
                            {(venue?.name ?? '').charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{venue?.name}</h1>
                            <div className="flex items-center gap-3 mt-1.5">
                                <span className={`px-2 py-0.5 ${venue?.is_public ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'} text-[10px] font-black uppercase tracking-widest rounded-md border`}>
                                    {venue?.is_public ? 'Public Facility' : 'Private Facility'}
                                </span>
                                <span className="text-slate-400 text-sm font-medium">•</span>
                                <span className="text-slate-500 text-sm font-medium">{safe(venue?.city)}, {safe(venue?.state || venue?.country)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={route('venues.index')}
                            className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all duration-200"
                        >
                            BACK
                        </Link>
                        <Link
                            href={venue?.id ? route('venues.edit', venue.id) : '#'}
                            className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl shadow-sm hover:bg-emerald-500 transition-all duration-200"
                        >
                            EDIT VENUE
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar Stats */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Highlights */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Venue Highlights</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 mb-0.5">Capacity</p>
                                        <p className="text-slate-900 font-black">{venue?.capacity || 'Unlimited'} People</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 mb-0.5">Rate</p>
                                        <p className="text-slate-900 font-black">${venue?.hourly_rate ?? 0}/hr</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Facilities */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Facilities</h3>
                            <div className="flex flex-wrap gap-2">
                                {venue.facilities ? venue.facilities.split(',').map((f, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100">
                                        {f.trim()}
                                    </span>
                                )) : (
                                    <p className="text-sm font-bold text-slate-300 italic">No facilities listed.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Map/Address & Upcoming Events */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Location</h3>
                            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-12 h-12 rounded-xl bg-white text-slate-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                </div>
                                <div>
                                    <p className="text-slate-900 font-black text-lg">{venue?.address}</p>
                                    <p className="text-slate-500 font-medium">{safe(venue?.city)}, {safe(venue?.state)} {safe(venue?.country)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Linked Events</h3>
                            </div>
                            <div className="p-8">
                                {venue?.events && venue.events.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {venue.events.map((event) => (
                                            <Link key={event.id} href={event.id ? route('events.show', event.id) : '#'} className="block p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                                                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">{event.event_type}</p>
                                                <p className="text-slate-900 font-bold group-hover:text-emerald-700 transition-colors uppercase">{safe(event.name)}</p>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-sm font-bold text-slate-300 italic">No events currently scheduled at this venue.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
