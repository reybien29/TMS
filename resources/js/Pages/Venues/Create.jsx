import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        city: '',
        state: '',
        country: 'USA',
        capacity: '',
        facilities: '',
        contact_phone: '',
        contact_email: '',
        hourly_rate: '',
        is_public: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('venues.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Add New Venue" />

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add New Venue</h1>
                        <p className="mt-2 text-slate-500 text-sm">Register a new facility for team events and games.</p>
                    </div>
                    <Link
                        href={route('venues.index')}
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
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                </div>
                                Venue Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Venue Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="e.g. City Sports Center"
                                    />
                                    {errors.name && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.name}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="Enter street address"
                                    />
                                    {errors.address && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.address}</p>}
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="Enter city"
                                    />
                                    {errors.city && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.city}</p>}
                                </div>

                                <div>
                                    <label htmlFor="state" className="block text-sm font-semibold text-slate-700 mb-2">State / Province</label>
                                    <input
                                        type="text"
                                        id="state"
                                        value={data.state}
                                        onChange={(e) => setData('state', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.state ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="Enter state"
                                    />
                                    {errors.state && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.state}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Capacity & Pricing */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pt-8 border-t border-slate-100">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                </div>
                                Specs & Pricing
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="capacity" className="block text-sm font-semibold text-slate-700 mb-2">Seating Capacity</label>
                                    <input
                                        type="number"
                                        id="capacity"
                                        value={data.capacity}
                                        onChange={(e) => setData('capacity', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.capacity ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="Max participants/spectators"
                                    />
                                    {errors.capacity && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.capacity}</p>}
                                </div>

                                <div>
                                    <label htmlFor="hourly_rate" className="block text-sm font-semibold text-slate-700 mb-2">Hourly Rate ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="hourly_rate"
                                        value={data.hourly_rate}
                                        onChange={(e) => setData('hourly_rate', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.hourly_rate ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="0.00"
                                    />
                                    {errors.hourly_rate && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.hourly_rate}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="facilities" className="block text-sm font-semibold text-slate-700 mb-2">Facilities / Amenities</label>
                                    <textarea
                                        id="facilities"
                                        rows="3"
                                        value={data.facilities}
                                        onChange={(e) => setData('facilities', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.facilities ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'} focus:ring-2 focus:border-transparent transition-all outline-none bg-slate-50/50`}
                                        placeholder="e.g. Parking, Restrooms, Wifi, Locker Rooms"
                                    ></textarea>
                                    {errors.facilities && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.facilities}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Public Access */}
                        <div className="pt-8 border-t border-slate-100 flex items-center gap-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={data.is_public}
                                    onChange={(e) => setData('is_public', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                <span className="ml-3 text-sm font-bold text-slate-700 uppercase tracking-widest">Publically Visible Venue</span>
                            </label>
                        </div>
                    </div>

                    <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-200 flex items-center justify-end gap-4">
                        <Link
                            href={route('venues.index')}
                            className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            CANCEL
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2"
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
                                'ADD VENUE'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
