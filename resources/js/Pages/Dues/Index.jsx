import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, dues, filters }) {
    return (
        <DashboardLayout>
            <Head title="Membership Dues" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Membership Dues</h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Review community contributions and membership payments.
                        </p>
                    </div>
                </div>

                {/* Dues Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Member</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Due Date</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 bg-white">
                                {dues.data.length > 0 ? (
                                    dues.data.map((due) => (
                                        <tr key={due.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold border border-slate-200 uppercase">
                                                        {due.user?.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-900 capitalize">{due.user?.name.toLowerCase()}</div>
                                                        <div className="text-xs font-medium text-slate-400 lowercase">{due.user?.email.toLowerCase()}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-black text-slate-700">
                                                ${due.amount}
                                            </td>
                                            <td className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-tight">
                                                {new Date(due.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                                    due.status === 'paid' 
                                                    ? 'bg-emerald-100 text-emerald-600 border-emerald-200' 
                                                    : due.status === 'overdue' 
                                                      ? 'bg-rose-100 text-rose-600 border-rose-200' 
                                                      : 'bg-orange-100 text-orange-600 border-orange-200'
                                                }`}>
                                                    {due.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right whitespace-nowrap">
                                                {auth.user.isAdmin ? (
                                                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {due.status === 'paid' ? 'Receipt' : 'Send Reminder'}
                                                    </button>
                                                ) : (
                                                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {due.status === 'paid' ? 'Details' : 'Pay Now'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center opacity-40">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 text-slate-300">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                                </div>
                                                <p className="font-bold text-slate-400">No dues records found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {dues.links && dues.links.length > 3 && (
                        <div className="px-8 py-6 border-t border-slate-50 flex items-center justify-between">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Total Records: {dues.total}
                            </div>
                            <div className="flex gap-1">
                                {dues.links.map((link, index) => (
                                    <Link 
                                        key={index} 
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                                            link.active 
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                                            : !link.url 
                                              ? 'text-slate-200 cursor-not-allowed' 
                                              : 'text-slate-500 hover:bg-slate-100 hover:text-blue-600'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
