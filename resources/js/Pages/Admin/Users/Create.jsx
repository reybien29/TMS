import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    return (
        <DashboardLayout>
            <Head title="Create New Member" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Add New Member</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Create a new profile for a community member or administrator.
                    </p>
                </div>

                <div className="max-w-2xl bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                    <form onSubmit={submit} className="p-10 space-y-8">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Full Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                                placeholder="e.g. Michael Jordan"
                                required
                            />
                            {errors.name && <p className="text-xs text-rose-500 font-bold mt-2 uppercase tracking-tight italic">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                                placeholder="you@example.com"
                                required
                            />
                            {errors.email && <p className="text-xs text-rose-500 font-bold mt-2 uppercase tracking-tight italic">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">System Role</label>
                            <select
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all appearance-none"
                            >
                                <option value="user">User / Player</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && <p className="text-xs text-rose-500 font-bold mt-2 uppercase tracking-tight italic">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Confirm Password</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full bg-slate-50 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                            <Link 
                                href={route('users.index')} 
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Register Member'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
