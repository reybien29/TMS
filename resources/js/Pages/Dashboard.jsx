import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const safe = (str) => str?.toLowerCase() ?? '';

const StatCard = ({ title, value, subtitle, icon, colorClass, isLight = false }) => (
    <div className={`${isLight ? 'bg-white' : colorClass} rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-44 group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1`}>
        <div className="flex justify-between items-start">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isLight ? 'text-slate-400' : 'text-white/80'}`}>
                {title}
            </span>
            <div className={`${isLight ? 'text-slate-300' : 'text-white/40'} transition-all group-hover:scale-110 group-hover:rotate-6 duration-300`}>
                {icon}
            </div>
        </div>
        <div>
            <div className={`text-4xl font-black mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {value}
            </div>
            <div className={`text-[10px] uppercase font-black tracking-wider leading-none ${isLight ? 'text-slate-400' : 'text-white/60'}`}>
                {subtitle}
            </div>
        </div>
    </div>
);

export default function Dashboard({
    my_registrations_count,
    my_dues_balance,
    upcoming_events,
    my_recent_registrations,
    latest_news
}) {
    return (
        <DashboardLayout>
            <Head title="Member Dashboard" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Hub</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Track your upcoming games, memberships, and community news.
                    </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="YOUR EVENTS"
                        value={my_registrations_count || 0}
                        subtitle="Total registrations"
                        colorClass="bg-blue-600"
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                    />
                    <StatCard
                        title="DUES BALANCE"
                        value={`$${Number(my_dues_balance || 0).toLocaleString()}`}
                        subtitle="Outstanding contributions"
                        colorClass="bg-[#7c3aed]" // Indigo 600
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                    />
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-44 group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                NEXT GAME
                            </span>
                            <div className="text-blue-500 group-hover:scale-110 duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div className="text-xl font-black text-gray-900 mb-1 truncate">
                                {upcoming_events && upcoming_events[0] ? safe(upcoming_events[0].title) : 'none scheduled'}
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                                {upcoming_events && upcoming_events[0] ? new Date(upcoming_events[0].start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'check back soon'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Member Specific Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Upcoming Events Member Can Join */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Available Events</h3>
                            <Link href={route('events.index')} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-500 transition-colors">EXPLORE</Link>
                        </div>
                        <div className="flex-1 overflow-y-auto min-h-[300px]">
                            {upcoming_events && upcoming_events.length > 0 ? (
                                <div className="divide-y divide-slate-50">
                                    {upcoming_events.map((event) => (
                                        <div key={event.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-lg shadow-sm">
                                                    🏀
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors capitalize">{safe(event.title)}</h4>
                                                    <p className="text-xs text-slate-400 font-medium">at {safe(event.venue?.name)}</p>
                                                </div>
                                            </div>
                                            <Link
                                                href={route('registrations.create', { event_id: event.id })}
                                                className="px-4 py-1.5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-blue-500 transition-colors"
                                            >
                                                JOIN
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center p-12 text-slate-300 opacity-60">
                                    <p className="font-bold">No new events available.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* My Recent Registrations */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Your Enrollments</h3>
                            <Link href={route('registrations.index')} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-500 transition-colors">VIEW ALL</Link>
                        </div>
                        <div className="flex-1 overflow-y-auto min-h-[300px]">
                            {my_recent_registrations && my_recent_registrations.length > 0 ? (
                                <div className="divide-y divide-slate-50">
                                    {my_recent_registrations.map((reg) => (
                                        <div key={reg.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                                            <div>
                                                <h4 className="font-bold text-gray-900 group-hover:text-emerald-500 transition-colors capitalize">{safe(reg.event?.title)}</h4>
                                                <p className="text-xs text-slate-400 font-medium">Status: <span className="text-emerald-500 uppercase tracking-widest font-black text-[8px]">{reg.payment_status}</span></p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black text-slate-900">${reg.payment_amount}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center p-12 text-slate-300 opacity-60">
                                    <p className="font-bold">You haven't joined any events yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

