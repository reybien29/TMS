import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const positionLabels = {
    point_guard: 'Point Guard',
    shooting_guard: 'Shooting Guard',
    small_forward: 'Small Forward',
    power_forward: 'Power Forward',
    center: 'Center',
    bench: 'Bench'
};

const safe = (str) => str?.toLowerCase() ?? '';

export default function Show({ team }) {
    const getPositionLabel = (position) => {
        return positionLabels[position] || position?.replace(/_/g, ' ') || 'No Position';
    };

    const playerCount = team.players?.length || 0;

    return (
        <DashboardLayout>
            <Head title={`Team Profile: ${team?.name || 'Team'}`} />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white text-2xl font-black shadow-2xl shadow-indigo-300/50 border-4 border-white/20">
                            {team?.abbreviation?.charAt(0) || (team?.name ?? '').charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{team?.name}</h1>
                            <div className="flex items-center gap-3 mt-1.5 text-sm font-medium text-slate-500">
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
                                    {team?.age_group ? `${team.age_group.toUpperCase()}` : 'Any Age'}
                                </span>
                                <span>•</span>
                                <span>{team?.division || 'Independent'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={route('teams.index')}
                            className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 hover:shadow-md transition-all duration-200 flex items-center gap-2"
                        >
                            ← Back to Teams
                        </Link>
                        <Link
                            href={team?.id ? route('teams.edit', team.id) : '#'}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all duration-200"
                        >
                            Edit Team
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
                    {/* Top Stats Grid */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#0a0f1c] rounded-3xl shadow-2xl border border-slate-800/50 p-8 text-white">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Team Hub</h3>
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 mx-auto mb-6 flex items-center justify-center text-2xl font-black shadow-xl shadow-black/30">
                                {team?.abbreviation || (team?.name ?? '').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="text-center">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Coach Contact</p>
                                <p className="text-lg font-bold">{team?.coach_contact || 'TBD'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Head Coach</p>
                                </div>
                            </div>
                            <p className="text-2xl font-black text-slate-900">{team?.coach_name || 'TBD'}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider">Roster Size</p>
                                </div>
                            </div>
                            <p className="text-3xl font-black text-slate-900">{playerCount}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">League</p>
                                </div>
                            </div>
                            <p className="text-xl font-bold text-slate-900">{team?.league || 'Independent'}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all md:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-icon-center justify-center">
                                </div>
                                <div>
                                    <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Division</label>
                                </div>
                            </div>
                            <p className="text-xl font-bold text-blue-600">{team.division}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content: Player Roster */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                        <h3 className="text-lg font-black text-slate-900">Active Roster ({playerCount})</h3>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-black uppercase tracking-wider rounded-full shadow-sm">
                            Current Players
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-50">
                            <thead>
                                <tr className="bg-slate-50/10">
                                    <th className="px-8 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400">Athlete</th>
                                    <th className="px-8 py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400">Position</th>
                                    <th className="px-8 py-4 text-right text-xs font-black uppercase tracking-widest text-slate-400">Jersey #</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {team.players && team.players.length > 0 ? (
                                    team.players.map((player) => (
                                        <tr key={player.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-4">
                                        <Link href={player?.id ? route('players.show', player.id) : '#'} className="group flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm font-bold border border-slate-200 group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all">
                                                        {(player?.first_name ?? '?').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                            {safe(player?.first_name)} {safe(player?.last_name)}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className="px-2 py-0.5 bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-wider rounded-md border border-slate-100">
                                                    {getPositionLabel(player.position)}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <span className="text-sm font-bold text-slate-700">#{player.jersey_number || '--'}</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-8 py-16 text-center">
                                            <div className="flex flex-col items-center opacity-40">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                                    </svg>
                                                </div>
                                                <h4 className="font-bold text-slate-400 mb-1">No Players Yet</h4>
                                                <p className="text-sm text-slate-300">Add players to complete the roster.</p>
                                            </div>
                                            </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
