import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, registrations }) {
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'paid': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            case 'pending': return 'bg-amber-100 text-amber-600 border-amber-200';
            case 'refunded': return 'bg-slate-100 text-slate-500 border-slate-200';
            default: return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    const handleCancel = (id) => {
        if (confirm('Are you sure you want to cancel this registration?')) {
            router.delete(route('registrations.destroy', id));
        }
    };

    return (
        <DashboardLayout>
            <Head title="My Registrations" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Registrations</h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Manage your event enrollments and track payment status.
                        </p>
                    </div>
                    <Link 
                        href={route('events.index')} 
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Browse Events
                    </Link>
                </div>

                {/* Registrations List */}
                <div className="grid grid-cols-1 gap-4">
                    {registrations.data.length > 0 ? (
                        registrations.data.map((reg) => (
                            <div key={reg.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                                    {/* Event Info */}
                                    <div className="flex-1 w-full text-center md:text-left">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-2">Event Enrollment</p>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                                            {reg.event?.title?.toLowerCase() || 'basketball event'}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-400">
                                            Registered on {formatDateTime(reg.created_at)}
                                        </p>
                                    </div>

                                    {/* Team/Player Info */}
                                    <div className="w-full md:w-auto px-6 py-3 bg-slate-50 rounded-2xl flex flex-col items-center md:items-start">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Team & Player</p>
                                        <p className="text-sm font-bold text-slate-600">
                                            {reg.player?.first_name} {reg.player?.last_name}
                                        </p>
                                        <p className="text-xs font-medium text-slate-400">
                                            {reg.team?.name?.toLowerCase() || 'no team assigned'}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div className="w-full md:w-auto text-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-2 md:hidden">Payment Status</p>
                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(reg.payment_status)}`}>
                                            {reg.payment_status}
                                        </span>
                                        <p className="text-xs font-bold text-slate-600 mt-2">
                                            ${reg.payment_amount}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="w-full md:w-auto flex items-center justify-center gap-2">
                                        <button 
                                            onClick={() => handleCancel(reg.id)}
                                            className="px-6 py-2.5 bg-rose-50 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-100 transition-colors uppercase tracking-widest border border-rose-100"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-3xl border border-slate-100 p-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 text-slate-200">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-400 mb-2">No registrations yet</h3>
                            <p className="text-slate-400 font-medium max-w-xs">You haven't registered for any events. Browse the events page to get started!</p>
                            <Link 
                                href={route('events.index')}
                                className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
                            >
                                Browse Events
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {registrations.links && registrations.links.length > 3 && (
                    <div className="mt-10 py-6 flex items-center justify-center gap-1">
                        {registrations.links.map((link, index) => (
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
