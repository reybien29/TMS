import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, activities }) {
    const getActionColor = (action) => {
        switch (action) {
            case 'created': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'updated': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'deleted': return 'text-rose-600 bg-rose-50 border-rose-100';
            case 'login': return 'text-violet-600 bg-violet-50 border-violet-100';
            default: return 'text-slate-600 bg-slate-50 border-slate-100';
        }
    };

    return (
        <DashboardLayout>
            <Head title="Audit Logs" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Audit Logs</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Complete history of administrative actions and community activities.
                    </p>
                </div>

                {/* Logs List */}
                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">User</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Model / Resource</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Time</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 bg-white">
                                {activities.data.length > 0 ? (
                                    activities.data.map((log) => (
                                        <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-200 uppercase">
                                                        {log.user?.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-900 capitalize">{log.user?.name.toLowerCase()}</div>
                                                        <div className="text-[10px] font-black text-slate-300 uppercase italic leading-none">{log.user?.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getActionColor(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="text-xs font-bold text-slate-600">
                                                    {log.model_type ? (
                                                        <>
                                                            <span className="text-[10px] font-black text-slate-300 uppercase mr-1">{log.model_type.split('\\').pop()}</span>
                                                            <span className="text-slate-400 font-medium">#{log.model_id}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">system event</span>
                                                    )}
                                                </div>
                                                {log.details && (
                                                    <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[200px] italic">
                                                        {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-8 py-5 text-sm font-black text-slate-500 tabular-nums">
                                                {new Date(log.created_at).toLocaleString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric', 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}
                                            </td>
                                            <td className="px-8 py-5 text-right text-[10px] font-black text-slate-300 tracking-widest">
                                                {log.ip_address || '--'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center opacity-40">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 text-slate-300">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                                </div>
                                                <p className="font-bold text-slate-400">No activity logs recorded yet.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {activities.links && activities.links.length > 3 && (
                        <div className="px-8 py-6 border-t border-slate-50 flex items-center justify-center gap-1">
                            {activities.links.map((link, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => window.location.href = link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    disabled={!link.url}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        link.active 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                        : !link.url 
                                          ? 'text-slate-200 cursor-not-allowed' 
                                          : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
