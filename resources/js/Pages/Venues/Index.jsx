import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, venues, filters }) {
    return (
        <DashboardLayout>
            <Head title="Venues" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Venues</h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Manage locations, courts, and facilities for your events.
                        </p>
                    </div>
                    {auth.user.isAdmin && (
                        <Link 
                            href={route('venues.create')} 
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/>
                            </svg>
                            Add Venue
                        </Link>
                    )}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.data.length > 0 ? (
                        venues.data.map((venue) => (
                            <div key={venue.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider text-blue-600 rounded-full">
                                            {venue.city.toLowerCase()}, {venue.country.toLowerCase()}
                                        </span>
                                    </div>
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        {venue.name.toLowerCase()}
                                    </h3>
                                    <p className="text-xs font-medium text-slate-400 mb-6 truncate">
                                        {venue.address.toLowerCase()}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Capacity</p>
                                            <p className="font-bold text-slate-600 tracking-tight">{venue.capacity || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Rate</p>
                                            <p className="font-bold text-slate-600 tracking-tight">${venue.hourly_rate}/hr</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {venue.facilities && venue.facilities.split(',').slice(0, 3).map((f, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-slate-50 text-[10px] font-bold text-slate-400 rounded-md uppercase tracking-tight italic">
                                                {f.trim().toLowerCase()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto p-4 bg-slate-50/50 border-t border-slate-50 flex items-center gap-2">
                                    <Link 
                                        href={route('venues.show', venue.id)}
                                        className="flex-1 text-center py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors uppercase tracking-widest"
                                    >
                                        {auth.user.isAdmin ? 'Manage' : 'Details'}
                                    </Link>
                                    {auth.user.isAdmin && (
                                        <Link 
                                            href={route('venues.edit', venue.id)}
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
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-400 mb-2">No venues registered</h3>
                            <p className="text-slate-400 font-medium max-w-xs">Start by adding your first basketball court or facility.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {venues.links && venues.links.length > 3 && (
                    <div className="mt-10 py-6 flex items-center justify-center gap-1">
                        {venues.links.map((link, index) => (
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
