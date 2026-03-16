import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const safe = (str) => str?.toLowerCase() ?? '';

export default function Index({ auth, teams, filters }) {
    return (
        <DashboardLayout>
            <Head title="Teams" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Teams</h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Manage clubs, teams, and divisions in your league.
                        </p>
                    </div>
                    {auth?.user?.isAdmin && (
                        <Link 
                            href={route('teams.create')} 
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/>
                            </svg>
                            Create Team
                        </Link>
                    )}
                </div>

                {/* Teams List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(teams?.data ?? []).length > 0 ? (
                        (teams?.data ?? []).map((team) => (
                            <div key={team.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                                <div className="p-8 pb-4 flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-100 p-1 mb-4 flex-shrink-0 relative overflow-hidden group-hover:border-blue-200 transition-colors">
                                        {team?.logo ? (
                                            <img src={team.logo} alt={team.name} className="w-full h-full object-contain rounded-full" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-2xl uppercase">
                                                {team?.abbreviation || (team?.name ?? '').charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {safe(team?.name)}
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
                                        {team?.team_type || 'basketball club'}
                                    </p>
                                </div>

                                <div className="px-8 py-6 grid grid-cols-2 gap-4 border-b border-slate-50">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Coach</p>
                                        <p className="text-sm font-bold text-slate-600 truncate">{safe(team?.coach_name) || 'unassigned'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Players</p>
                                        <p className="text-sm font-bold text-slate-600">{team?.players_count ?? 0} registered</p>
                                    </div>
                                </div>

                                <div className="px-8 py-4 bg-slate-50/20 flex flex-wrap gap-2">
                                    {team?.age_group && (
                                        <span className="px-2 py-1 bg-white border border-slate-100 text-[10px] font-bold text-slate-400 rounded-lg uppercase tracking-wider">
                                            {team.age_group}
                                        </span>
                                    )}
                                    {team?.division && (
                                        <span className="px-2 py-1 bg-white border border-slate-100 text-[10px] font-bold text-slate-400 rounded-lg uppercase tracking-wider">
                                            {safe(team.division)}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-auto p-4 bg-slate-50/50 border-t border-slate-50 flex items-center gap-2">
                                    <Link 
                                        href={route('teams.show', team.id)}
                                        className="flex-1 text-center py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors uppercase tracking-widest"
                                    >
                                        Roster
                                    </Link>
                                    {auth?.user?.isAdmin && (
                                        <Link 
                                            href={route('teams.edit', team.id)}
                                            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-xl transition-all"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white rounded-3xl border border-slate-100 p-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 text-slate-200">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-400 mb-2">No teams found</h3>
                            <p className="text-slate-400 font-medium max-w-xs">Register teams and assign players to start managing your league.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {(teams?.links ?? []).length > 3 && (
                    <div className="mt-10 py-6 flex items-center justify-center gap-1">
                        {(teams?.links ?? []).map((link, index) => (
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
