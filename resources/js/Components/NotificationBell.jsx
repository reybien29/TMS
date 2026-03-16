import { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import axios from 'axios';

export default function NotificationBell() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!auth.user) {
            setNotifications([]);
            setUnreadCount(0);
            setIsLoading(false);
            return;
        }

        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/notifications');
                setNotifications(response.data.data || []);
                setUnreadCount(response.data.unread_count || 0);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
                setNotifications([]);
                setUnreadCount(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
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
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-black text-white ring-2 ring-white shadow-sm">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs font-bold text-blue-600 hover:text-blue-500 uppercase tracking-widest px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className={`max-h-96 overflow-y-auto ${isLoading ? 'animate-pulse space-y-4 p-6' : ''}`}>
                        {isLoading ? (
                            <div className="space-y-3">
                                <div className="h-12 bg-slate-200 rounded-2xl animate-pulse"></div>
                                <div className="h-12 bg-slate-200 rounded-2xl animate-pulse"></div>
                                <div className="h-12 bg-slate-200 rounded-2xl animate-pulse w-3/4"></div>
                            </div>
                        ) : notifications.length > 0 ? (
                            <div className="divide-y divide-slate-50">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-5 hover:bg-slate-50 transition-all cursor-pointer flex gap-4 border-b border-slate-50 last:border-b-0 ${!notification.read_at ? 'bg-gradient-to-r from-blue-50 to-slate-50' : ''}`}
                                        onClick={() => !notification.read_at && markAsRead(notification.id)}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                                            notification.data?.type === 'event_reminder' ? 'bg-blue-100 text-blue-600 border-2 border-blue-200' :
                                            notification.data?.type === 'due_alert' ? 'bg-orange-100 text-orange-600 border-2 border-orange-200' :
                                            'bg-emerald-100 text-emerald-600 border-2 border-emerald-200'
                                        }`}>
                                            {notification.data?.type === 'event_reminder' ? (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                            ) : notification.data?.type === 'due_alert' ? (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                            ) : (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1 py-1">
                                            <p className="text-sm font-bold text-slate-900 line-clamp-1">{notification.data?.title || 'Notification'}</p>
                                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{notification.data?.message}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-2">
                                                {notification.created_at ? new Date(notification.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: '2-digit'
                                                }) : 'Just now'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center flex flex-col items-center justify-center opacity-50">
                                <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                </svg>
                                <h4 className="font-bold text-slate-400 mb-1">No notifications</h4>
                                <p className="text-sm text-slate-300">You're all caught up!</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
                        <Link
                            href="/dashboard"
                            className="text-xs font-black text-slate-400 hover:text-slate-900 uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                            onClick={() => setIsOpen(false)}
                        >
                            View activity log
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
