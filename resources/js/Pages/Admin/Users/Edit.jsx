import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <DashboardLayout>
            <Head title={`Edit Member: ${user.name}`} />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Access Control</h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Manage permissions and profile details for <span className="text-blue-600 font-bold">{user.name.toLowerCase()}</span>.
                        </p>
                    </div>
                    <Link 
                        href={route('users.index')} 
                        className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 font-bold rounded-xl border border-slate-100 shadow-sm transition-all duration-300"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        Back to Members
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                            <form onSubmit={handleSubmit} className="p-10">
                                <div className="space-y-8">
                                    {/* Profile Info */}
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                            Identity & Role
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"
                                                    required
                                                />
                                                {errors.name && <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mt-2 ml-1">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Privilege Level</label>
                                                <select
                                                    value={data.role}
                                                    onChange={e => setData('role', e.target.value)}
                                                    className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all appearance-none uppercase tracking-widest"
                                                >
                                                    <option value="user">Standard Member</option>
                                                    <option value="admin">Administrator</option>
                                                </select>
                                                {errors.role && <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mt-2 ml-1">{errors.role}</p>}
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"
                                                required
                                            />
                                            {errors.email && <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mt-2 ml-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    {/* Security */}
                                    <div className="pt-8 border-t border-slate-50">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                                            Security & Password
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">New Password</label>
                                                <input
                                                    type="password"
                                                    value={data.password}
                                                    onChange={e => setData('password', e.target.value)}
                                                    placeholder="Leave blank to keep"
                                                    className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Confirm Update</label>
                                                <input
                                                    type="password"
                                                    value={data.password_confirmation}
                                                    onChange={e => setData('password_confirmation', e.target.value)}
                                                    placeholder="Repeat password"
                                                    className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"
                                                />
                                            </div>
                                        </div>
                                        {errors.password && <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mt-2 ml-1">{errors.password}</p>}
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-[20px] shadow-xl shadow-blue-600/20 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Member Access'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0a0f1c] rounded-[40px] p-8 text-white">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Account Status</h4>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-[24px] bg-slate-800 flex items-center justify-center text-xl font-black border border-slate-700">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-black truncate">{user.name.toLowerCase()}</div>
                                    <div className={`text-[10px] font-black uppercase tracking-widest mt-1 px-2 py-0.5 rounded-md inline-block ${user.role === 'admin' ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                        {user.role}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 border-t border-slate-800 pt-6">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Registered On</div>
                                    <div className="text-xs font-bold text-slate-300">
                                        {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Last Update</div>
                                    <div className="text-xs font-bold text-slate-300 italic">
                                        {new Date(user.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-rose-50 border border-rose-100 rounded-[32px] p-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2 italic">Danger Zone</h4>
                            <p className="text-[10px] font-medium text-rose-500 mb-4">Deleting this member will permanently remove all associated registrations and historical data.</p>
                            <button
                                onClick={() => {
                                    if(confirm('Are you absolutely sure? This action is IRREVERSIBLE.')) {
                                        // Handle delete through a form or inertia helper
                                    }
                                }}
                                className="w-full py-3 bg-white text-rose-600 border border-rose-200 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-600 hover:text-white transition-all duration-300"
                            >
                                Delete Permanent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
