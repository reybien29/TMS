import { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function NotificationBell() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);

    // Initial load from search-docs would suggest using Inertia props, 
    // but for shared layout we often use a dedicated endpoint or shared data.
    // Given the current structure, we'll assume notifications are passed 
    // or we fetch them. For a "premium" feel, let's add a quick fetch.

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // We'll add this route in web.php
                const response = await fetch('/api/notifications');
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data.data);
                    setUnreadCount(data.unread_count);
                }
            } catch (error) {
                console.error('Failed to fetch notifications', error);
            }
        };

        if (auth.user) {
            fetchNotifications();
            // Poll every 60 seconds
            const interval = setInterval(fetchNotifications, 60000);
            return () => clearInterval(interval);
        }
    }, [auth.user]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (id) => {
        router.post(route('notifications.read', id), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setNotifications(prev => prev.map(n => n.id === id ? { ...n, read_at: new Date() } : n));
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        });
    };

    const markAllAsRead = () => {
        router.post(route('notifications.read.all'), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date() })));
                setUnreadCount(0);
            }
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-300"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white ring-2 ring-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Notifications</h3>
                        {unreadCount > 0 && (
                            <button 
                                onClick={markAllAsRead}
                                className="text-[10px] font-black text-blue-600 hover:text-blue-500 uppercase tracking-widest"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            <div className="divide-y divide-slate-50">
                                {notifications.map((notification) => (
                                    <div 
                                        key={notification.id} 
                                        className={`p-4 hover:bg-slate-50 transition-colors flex gap-4 ${!notification.read_at ? 'bg-blue-50/30' : ''}`}
                                        onClick={() => !notification.read_at && markAsRead(notification.id)}
                                    >
                                        <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                                            notification.data.type === 'event_reminder' ? 'bg-blue-100 text-blue-600' :
                                            notification.data.type === 'due_alert' ? 'bg-orange-100 text-orange-600' :
                                            'bg-emerald-100 text-emerald-600'
                                        }`}>
                                            {/* Simple Icon Mapping */}
                                            {notification.data.type === 'event_reminder' ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                            ) : notification.data.type === 'due_alert' ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold text-gray-900 line-clamp-1">{notification.data.title}</p>
                                            <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{notification.data.message}</p>
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2 italic">
                                                {new Date(notification.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 text-center flex flex-col items-center justify-center opacity-40">
                                <svg className="w-10 h-10 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                <p className="text-xs font-bold text-slate-400">All caught up!</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
                        <Link 
                            href={route('dashboard')} 
                            className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            View all activity
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
