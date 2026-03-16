import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

const safe = (str) => str?.toLowerCase() ?? '';

export default function Index({ auth, schedules, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
const [currentDate, setCurrentDate] = useState(new Date());

    const prevMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

    const handleSearch = (e) => {
        setSearch(e.target.value);
        router.get(route('schedules.index'), { search: e.target.value }, { preserveState: true, replace: true });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
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

        // Previous month filler
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            calendar.push({ day: prevMonthLastDay - i, currentMonth: false });
        }
        // Current month
        for (let i = 1; i <= days; i++) {
            calendar.push({ day: i, currentMonth: true });
        }
        // Next month filler
        const totalCells = 42;
        const nextMonthStart = 1;
        while (calendar.length < totalCells) {
            calendar.push({ day: nextMonthStart + (calendar.length - (days + startDay)), currentMonth: false });
        }
        return calendar;
    }, [currentDate]);

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const handleDateSelect = (day) => {
        const selectedDate = new Date(year, currentDate.getMonth(), day);
        const dateString = selectedDate.toISOString().split('T')[0];
        router.get(route('schedules.index'), { ...filters, date: dateString }, { preserveState: true });
    };

    return (
        <DashboardLayout>
            <Head title="League Schedule & Match Center" />

            <div className="max-w-[1240px] mx-auto">
                {/* Modern Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-100/50 rounded-full blur-2xl"></div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter relative">Match Center</h1>
                        <p className="text-slate-400 mt-3 font-bold uppercase tracking-[0.3em] text-[10px] ml-1">Live League Results & Upcoming Fixtures</p>
                    </div>
                    {auth?.user?.isAdmin && (
                        <Link
                            href={route('schedules.create')}
                            className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#1e293b] hover:bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest rounded-2xl shadow-2xl shadow-slate-900/10 transition-all duration-500 hover:scale-105 active:scale-95 border border-slate-700 hover:border-blue-400"
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/>
                            </svg>
                            Add New Match
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                    {/* Left: Premium Calendar Column */}
                    <div className="xl:col-span-4 sticky top-8 space-y-8">
                        <div className="bg-[#0f172a] rounded-[40px] p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
                            {/* Decorative background element */}
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-1000"></div>

                            <div className="flex items-center justify-between mb-10 relative">
                                <button onClick={prevMonth} className="p-3 hover:bg-white/10 rounded-2xl transition-all border border-white/5">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                                </button>
                                <div className="text-center">
                                    <h2 className="font-black text-xl uppercase tracking-tighter">{monthName}</h2>
                                    <p className="text-[10px] font-black tracking-[0.5em] text-blue-400/60 ml-1">{year}</p>
                                </div>
                                <button onClick={nextMonth} className="p-3 hover:bg-white/10 rounded-2xl transition-all border border-white/5">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-6">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                    <div key={day} className="text-[10px] font-black uppercase text-slate-500 text-center py-3 tracking-widest">{day}</div>
                                ))}
                                {calendarData.map((item, idx) => {
                                    const isToday = item.currentMonth && item.day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
                                    const hasEvent = item.currentMonth && (schedules?.data ?? []).some(s => new Date(s?.game_time).getDate() === item?.day);

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => item.currentMonth && handleDateSelect(item.day)}
                                            className={`aspect-square flex flex-col items-center justify-center text-xs font-black rounded-2xl transition-all cursor-pointer relative group/cell ${
                                                isToday
                                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/40 scale-110 z-10'
                                                : item.currentMonth
                                                  ? 'text-white hover:bg-white/10 border border-transparent hover:border-white/5'
                                                  : 'text-slate-700 font-bold opacity-30 cursor-default'
                                            }`}
                                        >
                                            {item.day}
                                            {hasEvent && !isToday && (
                                                <div className="absolute bottom-2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-sm shadow-blue-400/50"></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[30px] opacity-10 group-focus-within:opacity-25 transition-all blur-sm"></div>
                            <div className="relative bg-white border border-slate-100 rounded-[28px] overflow-hidden shadow-sm">
                                <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="SEARCH FIXTURES..."
                                    value={search}
                                    onChange={handleSearch}
                                    className="w-full bg-transparent border-none pl-16 pr-8 py-5 text-[11px] font-black text-gray-900 placeholder:text-slate-300 focus:ring-0 outline-none uppercase tracking-[0.2em]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Detailed Match List */}
                    <div className="xl:col-span-8">
                        <div className="space-y-6">
                            {(schedules?.data ?? []).length > 0 ? (
                                (schedules?.data ?? []).map((game) => (
                                    <div key={game.id} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 group relative overflow-hidden">
                                        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                                            {/* Date/Time Indicator */}
                                            <div className="flex flex-col items-center justify-center p-4 min-w-[100px] border-r border-slate-50 pr-10">
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">{new Date(game.game_time).toLocaleString('default', { month: 'short' })}</span>
                                                <span className="text-4xl font-black text-slate-900 leading-none">{new Date(game.game_time).getDate()}</span>
                                                <span className="text-[10px] font-black text-blue-500 mt-2 uppercase tracking-widest">{formatTime(game.game_time)}</span>
                                            </div>

                                            {/* Teams Grid */}
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-8 w-full">
                                                <div className="text-right space-y-1">
                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Home Team</p>
                                                    <h3 className="text-xl md:text-2xl font-black text-slate-900 capitalize group-hover:text-blue-600 transition-colors leading-tight">{safe(game.home_team?.name) || 'tbd'}</h3>
                                                </div>

                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs shadow-xl order-2 md:order-2">VS</div>
                                                    {game.game_status === 'completed' && (
                                                        <div className="text-2xl font-black text-blue-600 bg-blue-50 px-4 py-1 rounded-xl border border-blue-100 order-1 md:order-1 tabular-nums animate-in slide-in-from-top-1">
                                                            {game.score_home} - {game.score_away}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="text-left space-y-1">
                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Away Team</p>
                                                    <h3 className="text-xl md:text-2xl font-black text-slate-900 capitalize group-hover:text-blue-600 transition-colors leading-tight">{safe(game.away_team?.name) || 'tbd'}</h3>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-4 pl-8 border-l border-slate-50 min-w-[120px]">
                                                {auth?.user?.isAdmin ? (
                                                    <Link
                                                        href={route('schedules.edit', game.id)}
                                                        className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all shadow-sm hover:scale-110 active:scale-95"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    </Link>
                                                ) : (
                                                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border ${
                                                        game.game_status === 'completed' ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-lg shadow-emerald-500/10'
                                                    }`}>
                                                        {game.game_status}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom Bar Details */}
                                        <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap gap-6 items-center">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{safe(game?.location)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Standard League Game</span>
                                            </div>
                                            <div className="ml-auto flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${game.game_status === 'scheduled' ? 'bg-blue-600' : 'bg-emerald-500'}`}></div>
                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">MATCH {game.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-[40px] border border-slate-100 p-32 flex flex-col items-center justify-center text-center shadow-sm">
                                    <div className="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center mb-10 text-slate-200">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Empty Court</h3>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] max-w-xs leading-loose">No fixtures found for this period. check back soon for updated rankings and schedules.</p>
                                    <button
                                        onClick={() => router.get(route('schedules.index'))}
                                        className="mt-10 px-10 py-4 bg-[#0f172a] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-900/10 hover:scale-105 transition-all"
                                    >
                                        RESET VIEW
                                    </button>
                                </div>
                            )}

                            {/* Pagination */}
                            {(schedules?.links ?? []).length > 3 && (
                                <div className="mt-12 py-10 flex items-center justify-center gap-2">
                                    {(schedules?.links ?? []).map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`min-w-[44px] h-11 flex items-center justify-center rounded-2xl text-[11px] font-black transition-all border ${
                                                link.active
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20'
                                                : !link.url
                                                  ? 'text-slate-200 border-transparent cursor-not-allowed uppercase'
                                                  : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:text-blue-600 shadow-sm'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
