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

export default function Show({ player }) {
    const getPositionLabel = (position) => {
        return positionLabels[position] || position || 'No Position';
    };

    return (
        <DashboardLayout>
            <Head title={`Player Profile: ${player?.first_name || 'Player'}`} />

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Player Profile</h1>
                        <p className="mt-2 text-slate-500 text-sm">Detailed information for {safe(player?.first_name)} {safe(player?.last_name)}.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={route('players.index')}
                            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all duration-200"
                        >
                            Back to List
                        </Link>
                        <Link
                            href={player?.id ? route('players.edit', player.id) : '#'}
                            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-500 transition-all duration-200"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Dark Avatar Sidebar Card */}
                    <div className="md:col-span-1">
                        <div className="bg-[#0a0f1c] rounded-2xl shadow-2xl border border-slate-800/50 p-8 flex flex-col items-center text-center text-white">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-4xl font-black mb-6 shadow-2xl shadow-black/30 border-4 border-slate-700/50">
                                {(player?.first_name ?? '?').charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-2xl font-black text-white mb-2">{safe(player?.first_name)} {safe(player?.last_name)}</h2>
                            <p className="text-slate-300 text-lg font-semibold uppercase tracking-wide mb-8">{getPositionLabel(player?.position)}</p>

                            <div className="w-full pt-8 border-t border-slate-700 flex flex-col items-center gap-4">
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Jersey</p>
                                    <p className="text-xl font-bold text-white">#{player.jersey_number || '--'}</p>
                                </div>
                                <div className="w-px h-12 bg-slate-700"></div>
                                <div className="text-center">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Team</p>
                                    <p className="text-base font-bold text-white">{safe(player?.team?.name) || 'Unassigned'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Registration Date</p>
                                    <p className="text-sm font-bold text-slate-200">{player?.created_at ? new Date(player.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Info */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Contact Information</h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</label>
                                    <p className="text-slate-700 font-medium">{player?.email || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone</label>
                                    <p className="text-slate-700 font-medium">{player?.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date of Birth</label>
                                    <p className="text-slate-700 font-medium">{player?.date_of_birth ? new Date(player.date_of_birth).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info if available */}
                        {(player.emergency_contact || player.medical_notes) && (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Medical & Emergency</h3>
                                </div>
                                <div className="p-8 space-y-6">
                                    {player.emergency_contact && (
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Emergency Contact</label>
                                            <p className="text-slate-700 font-medium">{player.emergency_contact} ({player.emergency_phone || 'N/A'})</p>
                                        </div>
                                    )}
                                    {player.medical_notes && (
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Medical Notes</label>
                                            <p className="text-slate-700 font-medium">{player.medical_notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
