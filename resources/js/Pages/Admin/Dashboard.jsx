import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, usePage } from '@inertiajs/react';

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

const IndicatorCard = ({ title, value, status, icon, trendIcon, isGrowth = false }) => (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-44 group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
        <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {title}
            </span>
            <div className="text-slate-300 group-hover:scale-110 duration-300">
                {trendIcon}
            </div>
        </div>
        <div>
            <div className="text-4xl font-black text-gray-900 mb-1">
                {value}
            </div>
            <div className={`text-[10px] flex items-center gap-1 font-black uppercase tracking-widest ${isGrowth ? 'text-blue-600' : 'text-emerald-500'}`}>
                {icon}
                {status}
            </div>
        </div>
    </div>
);

export default function Dashboard({ 
    total_users, 
    total_events, 
    total_teams, 
    total_venues, 
    total_registrations, 
    total_dues,
    overdue_dues_count,
    latest_news,
    recent_events 
}) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <DashboardLayout>
            <Head title="Admin Dashboard" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Welcome back, <span className="text-slate-900 font-bold">{user.name.split(' ')[0].toLowerCase()}!</span> System status is optimal.
                    </p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        title="TOTAL MEMBERS" 
                        value={total_users || 0}
                        subtitle="Active community spirits"
                        colorClass="bg-blue-600"
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>}
                    />
                    <StatCard 
                        title="TOTAL DUES" 
                        value={`$${Number(total_dues || 0).toLocaleString()}`} 
                        subtitle="Collected successfully"
                        colorClass="bg-[#7c3aed]" // Indigo 600
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                    />
                    <IndicatorCard 
                        title="COMMUNITY HEALTH"
                        value="Optimal"
                        status="Healthy engagement"
                        icon={<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>}
                        trendIcon={<svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>}
                    />
                    <IndicatorCard 
                        title="OVERDUE DUES"
                        value={overdue_dues_count || 0}
                        status="Attention needed"
                        icon={<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                        trendIcon={<svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>}
                    />
                </div>

                {/* Secondary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Your Schedule Panel */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px] flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="text-blue-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Upcoming Schedule</h3>
                            </div>
                            <Link href={route('events.index')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                                VIEW ALL 
                                <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                            </Link>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {recent_events && recent_events.length > 0 ? (
                                <div className="divide-y divide-slate-50">
                                    {recent_events.map((event) => (
                                        <div key={event.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                                                    {event.event_type === 'game' ? '🏀' : event.event_type === 'practice' ? '🏃‍♂️' : '📅'}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors capitalize">{event.title.toLowerCase()}</h4>
                                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-tight italic">
                                                        {new Date(event.start_time).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toLowerCase()} at {new Date(event.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Venue</p>
                                                <p className="text-xs font-bold text-slate-600 tracking-tight capitalize">{event.venue?.name.toLowerCase() || 'unassigned'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-60">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 text-slate-300">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                    </div>
                                    <p className="text-slate-400 font-bold">No upcoming events scheduled.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Latest News Panel */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                        <div className="p-8 border-b border-slate-50 flex items-center gap-3">
                            <div className="text-[#ec4899]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Latest News</h3>
                        </div>
                        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
                            {latest_news && latest_news.length > 0 ? (
                                latest_news.map((item) => (
                                    <div key={item.id} className="group cursor-pointer">
                                        <h4 className="text-2xl font-black text-gray-900 group-hover:text-[#ec4899] transition-colors leading-tight">
                                            {item.title.toLowerCase()}
                                        </h4>
                                        <p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-widest">
                                            {new Date(item.published_at || item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="group cursor-pointer">
                                    <h4 className="text-2xl font-black text-gray-900 group-hover:text-[#ec4899] transition-colors leading-tight">hoophub live</h4>
                                    <p className="text-slate-500 font-bold text-sm mt-1">Platform migration complete. Explore the new dashboard.</p>
                                    <p className="text-[10px] font-black text-slate-300 mt-4 uppercase tracking-widest italic">MARCH 16TH, 2026</p>
                                </div>
                            )}
                        </div>
                        <div className="p-8 mt-auto bg-slate-50/50">
                             <div className="bg-[#ec4899]/5 rounded-2xl p-4 border border-[#ec4899]/10">
                                <p className="text-[10px] text-[#ec4899] font-black uppercase tracking-widest mb-1 italic">Notice</p>
                                <p className="text-xs text-slate-500 font-medium">System maintenance scheduled for next Saturday at 2 AM EST.</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
