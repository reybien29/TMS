import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ player, teams }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: player.first_name || '',
        last_name: player.last_name || '',
        email: player.email || '',
        phone: player.phone || '',
        date_of_birth: player.date_of_birth || '',
        position: player.position || '',
        jersey_number: player.jersey_number || '',
        team_id: player.team_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('players.update', player.id));
    };

    return (
        <DashboardLayout>
            <Head title={`Edit Player: ${player.first_name}`} />

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Player</h1>
                        <p className="mt-2 text-slate-500 text-sm">Update profile information for {player.first_name} {player.last_name}.</p>
                    </div>
                    <Link
                        href={route('players.index')}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all duration-200"
                    >
                        Back to List
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 space-y-8">
                        {/* Personal Information */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                </div>
                                Personal Details
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.first_name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="Enter first name"
                                    />
                                    {errors.first_name && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.first_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.last_name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="Enter last name"
                                    />
                                    {errors.last_name && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.last_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="athlete@example.com"
                                    />
                                    {errors.email && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    {errors.phone && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label htmlFor="date_of_birth" className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        id="date_of_birth"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.date_of_birth ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                    />
                                    {errors.date_of_birth && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.date_of_birth}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Roster Information */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pt-8 border-t border-slate-100">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                </div>
                                Roster & Position
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="team_id" className="block text-sm font-semibold text-slate-700 mb-2">Assigned Team</label>
                                    <select
                                        id="team_id"
                                        value={data.team_id}
                                        onChange={(e) => setData('team_id', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.team_id ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50 cursor-pointer text-slate-700`}
                                    >
                                        <option value="">Select Team</option>
                                        {teams.map((team) => (
                                            <option key={team.id} value={team.id}>{team.name}</option>
                                        ))}
                                    </select>
                                    {errors.team_id && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.team_id}</p>}
                                </div>

                                <div>
                                    <label htmlFor="position" className="block text-sm font-semibold text-slate-700 mb-2">Position</label>
                                    <select
                                        id="position"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.position ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50 cursor-pointer text-slate-700`}
                                    >
                                        <option value="">Select Position</option>
                                        <option value="point_guard">Point Guard</option>
                                        <option value="shooting_guard">Shooting Guard</option>
                                        <option value="small_forward">Small Forward</option>
                                        <option value="power_forward">Power Forward</option>
                                        <option value="center">Center</option>
                                        <option value="bench">Bench</option>
                                    </select>
                                    {errors.position && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.position}</p>}
                                </div>

                                <div>
                                    <label htmlFor="jersey_number" className="block text-sm font-semibold text-slate-700 mb-2">Jersey Number</label>
                                    <input
                                        type="text"
                                        id="jersey_number"
                                        value={data.jersey_number}
                                        onChange={(e) => setData('jersey_number', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.jersey_number ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="e.g. 23"
                                    />
                                    {errors.jersey_number && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.jersey_number}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-200 flex items-center justify-end gap-4">
                        <Link
                            href={route('players.index')}
                            className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            CANCEL
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-2.5 bg-[#0a0f1c] text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    SAVING...
                                </>
                            ) : (
                                'UPDATE PLAYER'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
