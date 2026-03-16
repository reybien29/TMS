import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import HoopHubLogo from '@/Components/ApplicationLogo';
import NotificationBell from '@/Components/NotificationBell';

const safeRoute = (name, params = {}) => {
    try {
        return (window.route && window.route(name, params)) || '#';
    } catch (e) {
        return '#';
    }
};

const safeCurrent = (patterns) => {
    try {
        return patterns.some(pattern => window.route().current(pattern));
    } catch (e) {
        return false;
    }
};

const SidebarItem = ({ href, icon, label, active = false, onClick }) => (
    <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 group ${
            active
            ? 'bg-slate-800 text-white shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        }`}
    >
        <div className={`w-5 h-5 flex items-center justify-center ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>
            {icon}
        </div>
        <span className="font-medium text-sm">{label}</span>
    </Link>
);

export default function DashboardLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-[#f8fafc] font-sans relative overflow-x-hidden">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[45] md:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen w-64 bg-[#0a0f1c] text-white flex flex-col z-50 transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                {/* Mobile Close Button */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white md:hidden"
                    aria-label="Close Sidebar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-12 md:py-6 space-y-1 overflow-y-auto">
                    <SidebarItem
                        href={safeRoute('dashboard')}
                        label="Dashboard"
                        onClick={() => setSidebarOpen(false)}
                        active={safeCurrent(['dashboard', 'admin.dashboard'])}
                        icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>}
                    />
                    <SidebarItem
                        href={safeRoute('schedules.index')}
                        label="Schedule"
                        onClick={() => setSidebarOpen(false)}
                        active={safeCurrent(['schedules.*'])}
                        icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
                    />
                    <SidebarItem
                        href={safeRoute('events.index')}
                        label="Events"
                        onClick={() => setSidebarOpen(false)}
                        active={safeCurrent(['events.*'])}
                        icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
                    />
                    <SidebarItem
                        href={safeRoute('players.index')}
                        label="Players"
                        onClick={() => setSidebarOpen(false)}
                        active={safeCurrent(['players.*'])}
                        icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
                    />
                    <SidebarItem
                        href={safeRoute('teams.index')}
                        label="Teams"
                        onClick={() => setSidebarOpen(false)}
                        active={safeCurrent(['teams.*'])}
                        icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>}
                    />
                    <SidebarItem
                        href={safeRoute('venues.index')}
                        label="Venues"
                        onClick={() => setSidebarOpen(false)}
                        active={safeCurrent(['venues.*'])}
                        icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                    />
                    {(user.isAdmin ?? false) && (
                        <SidebarItem
                            href={safeRoute('users.index')}
                            label="Members"
                            onClick={() => setSidebarOpen(false)}
                            active={safeCurrent(['users.*'])}
                            icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>}
                        />
                    )}
                    <SidebarItem
                        href={safeRoute('dues.index')}
                        label="Dues"
                        onClick={() => setSidebarOpen(false)}
                        active={safeCurrent(['dues.*'])}
                        icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                    />
                    <SidebarItem
                        href={safeRoute('registrations.index')}
                        label="Registrations"
                        onClick={() => setSidebarOpen(false)}
                        active={safeCurrent(['registrations.*'])}
                        icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                    />
                    <SidebarItem
                        href={safeRoute('news.index')}
                        label="News"
                        onClick={() => setSidebarOpen(false)}
                        active={safeCurrent(['news.*'])}
                        icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>}
                    />
                    {(user.isAdmin ?? false) && (
                        <SidebarItem
                            href={safeRoute('activities.index')}
                            label="Audit Logs"
                            onClick={() => setSidebarOpen(false)}
                            active={safeCurrent(['activities.index'])}
                            icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                        />
                    )}
                </nav>

                {/* User Info & Actions */}
                <div className="p-4 border-t border-slate-800 bg-[#0f172a]/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-orange-500 overflow-hidden flex-shrink-0 border-2 border-slate-700 shadow-lg">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name || ''} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-orange-400 to-orange-600">
                                    {(user.name?.charAt(0) || '?').toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{(user.name || 'Anonymous').toLowerCase()}</p>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{(user.email || 'no-email').toLowerCase()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href={safeRoute('profile.edit')}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-blue-600/10 hover:text-blue-500 text-slate-400 rounded-lg text-xs font-bold transition-all duration-300 border border-slate-700 hover:border-blue-500/30 group"
                        >
                            PROFILE
                        </Link>
                        <Link
                            href={safeRoute('logout')}
                            method="post"
                            as="button"
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-red-600/10 hover:text-red-500 text-slate-400 rounded-lg text-xs font-bold transition-all duration-300 border border-slate-700 hover:border-red-500/30 group"
                        >
                            LOGOUT
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300 w-full min-w-0">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6 md:justify-end">
                    {/* Hamburger Button (Mobile Only) */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 text-slate-600 md:hidden hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Open Sidebar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-4">
                        <NotificationBell />
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}
