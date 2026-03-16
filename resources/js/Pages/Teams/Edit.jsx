import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ team }) {
    const { data, setData, put, processing, errors } = useForm({
        name: team.name || '',
        abbreviation: team.abbreviation || '',
        coach_name: team.coach_name || '',
        coach_contact: team.coach_contact || '',
        team_type: team.team_type || '',
        age_group: team.age_group || '',
        division: team.division || '',
        league: team.league || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('teams.update', team.id));
    };

    return (
        <DashboardLayout>
            <Head title={`Edit Team: ${team.name}`} />

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Team</h1>
                        <p className="mt-2 text-slate-500 text-sm">Modify configuration for {team.name}.</p>
                    </div>
                    <Link
                        href={route('teams.index')}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all duration-200"
                    >
                        Back to List
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 space-y-8">
                        {/* Basic Information */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                </div>
                                Team Identity
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Team Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="e.g. Lakers Academy, Celtics Youth"
                                    />
                                    {errors.name && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="abbreviation" className="block text-sm font-semibold text-slate-700 mb-2">Abbreviation</label>
                                    <input
                                        type="text"
                                        id="abbreviation"
                                        value={data.abbreviation}
                                        onChange={(e) => setData('abbreviation', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.abbreviation ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="e.g. LAK, CEL"
                                    />
                                    {errors.abbreviation && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.abbreviation}</p>}
                                </div>

                                <div>
                                    <label htmlFor="age_group" className="block text-sm font-semibold text-slate-700 mb-2">Age Group</label>
                                    <select
                                        id="age_group"
                                        value={data.age_group}
                                        onChange={(e) => setData('age_group', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.age_group ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50 cursor-pointer text-slate-700`}
                                    >
                                        <option value="">Select Age Group</option>
                                        <option value="u8">Under 8 (U8)</option>
                                        <option value="u10">Under 10 (U10)</option>
                                        <option value="u12">Under 12 (U12)</option>
                                        <option value="u14">Under 14 (U14)</option>
                                        <option value="u16">Under 16 (U16)</option>
                                        <option value="u18">Under 18 (U18)</option>
                                        <option value="adult">Adult</option>
                                    </select>
                                    {errors.age_group && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.age_group}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Management */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pt-8 border-t border-slate-100">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                </div>
                                Coaching & Staff
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="coach_name" className="block text-sm font-semibold text-slate-700 mb-2">Coach Name</label>
                                    <input
                                        type="text"
                                        id="coach_name"
                                        value={data.coach_name}
                                        onChange={(e) => setData('coach_name', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.coach_name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="Enter coach's full name"
                                    />
                                    {errors.coach_name && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.coach_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="coach_contact" className="block text-sm font-semibold text-slate-700 mb-2">Coach Contact</label>
                                    <input
                                        type="text"
                                        id="coach_contact"
                                        value={data.coach_contact}
                                        onChange={(e) => setData('coach_contact', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.coach_contact ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="Email or phone number"
                                    />
                                    {errors.coach_contact && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.coach_contact}</p>}
                                </div>
                            </div>
                        </div>

                        {/* League Info */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pt-8 border-t border-slate-100">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                </div>
                                Competition Details
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="team_type" className="block text-sm font-semibold text-slate-700 mb-2">Team Type</label>
                                    <input
                                        type="text"
                                        id="team_type"
                                        value={data.team_type}
                                        onChange={(e) => setData('team_type', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.team_type ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="e.g. Competitive, Recreational"
                                    />
                                    {errors.team_type && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.team_type}</p>}
                                </div>

                                <div>
                                    <label htmlFor="division" className="block text-sm font-semibold text-slate-700 mb-2">Division</label>
                                    <input
                                        type="text"
                                        id="division"
                                        value={data.division}
                                        onChange={(e) => setData('division', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.division ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="e.g. Division A, North"
                                    />
                                    {errors.division && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.division}</p>}
                                </div>

                                <div>
                                    <label htmlFor="league" className="block text-sm font-semibold text-slate-700 mb-2">League</label>
                                    <input
                                        type="text"
                                        id="league"
                                        value={data.league}
                                        onChange={(e) => setData('league', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.league ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="e.g. City Basketball League"
                                    />
                                    {errors.league && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.league}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-200 flex items-center justify-end gap-4">
                        <Link
                            href={route('teams.index')}
                            className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            CANCEL
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
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
                                'UPDATE TEAM'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
