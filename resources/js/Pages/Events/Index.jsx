import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

const safe = (str) => str?.toLowerCase() ?? '';

const safeFormatTime = (dateString) => {
    if (!dateString) return '--:--';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '--:--';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

export default function Index({ auth, events, filters }) {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
    const [currentDate, setCurrentDate] = useState(new Date());

    const safeFormatDateTime = (dateString) => {
        if (!dateString) return 'Date TBD';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'scheduled': return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'in_progress': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            case 'completed': return 'bg-slate-100 text-slate-500 border-slate-200';
            case 'cancelled': return 'bg-rose-100 text-rose-600 border-rose-200';
            default: return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    const getEventTypeLabel = (type) => {
        const labels = {
            game: '🏀 Game',
            practice: '🏃‍♂️ Practice',
            tournament: '🏆 Tournament',
            meeting: '👥 Meeting',
            training: '🎓 Training'
        };
        return labels[type] || '📅 Event';
    };

    // Calendar Logic
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const calendarData = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const days = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const calendar = [];

        for (let i = startDay - 1; i >= 0; i--) {
            calendar.push({ day: null, currentMonth: false });
        }
        for (let i = 1; i <= days; i++) {
            calendar.push({ day: i, currentMonth: true });
        }
        return calendar;
    }, [currentDate]);

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        router.get(route('events.index'), newFilters, { preserveState: true, replace: true });
    };

    return (
        <DashboardLayout>
            <Head title="Events & League Schedule" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Schedule</h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Join practices, league games, and community meetups.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* View Switcher */}
                        <div className="flex p-1 bg-slate-100 rounded-2xl">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                GRID
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                CALENDAR
                            </button>
                        </div>

                        {auth?.user?.isAdmin && (
                            <Link
                                href={route('events.create')}
                                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/>
                                </svg>
                                New Event
                            </Link>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Search</label>
                            <input
                                type="text"
                                placeholder="Filter by title..."
                                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition-all font-bold text-slate-700 placeholder-slate-300 text-sm"
                                defaultValue={filters?.search}
                                onBlur={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Event Type</label>
                            <select
                                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                value={filters?.event_type || ''}
                                onChange={(e) => handleFilterChange('event_type', e.target.value)}
                            >
                                <option value="">All Types</option>
                                <option value="game">Games</option>
                                <option value="practice">Practices</option>
                                <option value="tournament">Tournaments</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">From Date</label>
                            <input
                                type="date"
                                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                value={filters?.start_date || ''}
                                onChange={(e) => handleFilterChange('start_date', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">To Date</label>
                            <input
                                type="date"
                                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                value={filters?.end_date || ''}
                                onChange={(e) => handleFilterChange('end_date', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(events?.data ?? []).length > 0 ? (
                            (events?.data ?? []).map((event) => {
                                const isFull = event.max_participants && event.registrations_count >= event.max_participants;
                                return (
                                    <div key={event.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(event?.status)}`}>
                                                    {(event?.status ?? 'unknown').replace('_', ' ')}
                                                </span>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-2xl">{getEventTypeLabel(event?.event_type).split(' ')[0]}</span>
                                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] mt-1">{getEventTypeLabel(event?.event_type).split(' ')[1]}</p>
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight capitalize">
                                                {safe(event.title)}
                                            </h3>

                                            <div className="space-y-4 my-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Timing</p>
                                                        <p className="text-sm font-bold text-slate-600 tracking-tight">{safeFormatDateTime(event?.start_time)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Venue</p>
                                                        <p className="text-sm font-bold text-slate-600 tracking-tight capitalize">{safe(event.venue?.name) || 'unassigned'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Capacity Tracker */}
                                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-2">
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance</span>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isFull ? 'text-rose-500' : 'text-blue-600'}`}>
                                                        {event?.registrations_count ?? 0} / {event?.max_participants || '∞'}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-500 ${isFull ? 'bg-rose-500' : 'bg-blue-600'}`}
                                                        style={{ width: `${Math.min(100, ((event?.registrations_count ?? 0) / (event?.max_participants || 100)) * 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto p-6 bg-slate-50/50 border-t border-slate-50 flex items-center gap-3">
                                            <Link
                                                href={route('events.show', event.id)}
                                                className="flex-1 text-center py-3 bg-white border border-slate-200 text-slate-600 font-bold text-[10px] rounded-2xl hover:bg-slate-50 transition-colors uppercase tracking-[0.2em]"
                                            >
                                                Details
                                            </Link>
                                            <Link
                                                href={isFull ? '#' : route('registrations.create', { event_id: event?.id })}
                                                disabled={isFull}
                                                className={`flex-[1.5] text-center py-3 font-bold text-[10px] rounded-2xl transition-all uppercase tracking-[0.2em] shadow-lg ${
                                                    isFull
                                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20'
                                                }`}
                                            >
                                                {isFull ? 'FULL' : 'REGISTER'}
                                            </Link>
                                            {auth?.user?.isAdmin && (
                                                <Link
                                                    href={route('events.edit', event.id)}
                                                    className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-2xl transition-all shadow-sm"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full bg-white rounded-[40px] border border-slate-100 p-32 flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 text-slate-200">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">No events match your criteria</h3>
                                <p className="text-slate-400 font-medium max-w-sm">Try broadening your search or adjusting your date range filters.</p>
                                <button
                                    onClick={() => router.get(route('events.index'))}
                                    className="mt-8 px-8 py-3 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl shadow-blue-600/20 hover:scale-105 transition-all"
                                >
                                    RESET FILTERS
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Calendar Centric View */
                    <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-6">
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">{monthName} <span className="text-blue-600">{year}</span></h2>
                                <div className="flex bg-white rounded-2xl p-1 border border-slate-100 shadow-sm">
                                    <button
                                        onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                                        className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                                    </button>
                                    <button
                                        onClick={() => setCurrentDate(new Date())}
                                        className="px-4 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                                        className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-4">
                               <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Games</span>
                               </div>
                               <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Practices</span>
                               </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 border-b border-slate-100">
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                <div key={day} className="py-4 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] bg-slate-50/50">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 grid-rows-5 h-[800px]">
                            {calendarData.map((item, idx) => {
                                const dayEvents = (events?.data ?? []).filter(e => {
                                    const d = new Date(e?.start_time);
                                    return d.getDate() === item?.day && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
                                });
                                return (
                                    <div key={idx} className={`border-r border-b border-slate-50 p-4 transition-all duration-300 ${item.day ? 'bg-white hover:bg-slate-50/30' : 'bg-slate-50/20'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-sm font-black ${item.day ? 'text-gray-900' : 'text-slate-200'}`}>{item.day}</span>
                                        </div>
                                        <div className="space-y-1">
                                            {dayEvents.map(e => (
                                                <Link
                                                    key={e.id}
                                                    href={e.id ? route('events.show', e.id) : '#'}
                                                    className={`block p-2 rounded-xl text-[10px] font-bold truncate transition-all hover:scale-[1.02] border ${
                                                        e.event_type === 'game' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    }`}
                                                >
                                                    {safeFormatTime(e?.start_time)} {safe(e.title)}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {viewMode === 'grid' && (events?.links ?? []).length > 3 && (
                    <div className="mt-10 py-6 flex items-center justify-center gap-1">
                        {(events?.links ?? []).map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                    link.active
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : !link.url
                                      ? 'text-slate-200 cursor-not-allowed'
                                      : 'text-slate-500 hover:bg-white hover:text-blue-600 border border-transparent hover:border-slate-100 shadow-sm'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
