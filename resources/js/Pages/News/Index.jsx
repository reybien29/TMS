import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const safe = (str) => str?.toLowerCase() ?? '';

export default function Index({ auth, news, filters }) {
    return (
        <DashboardLayout>
            <Head title="Latest News" />

            <div className="max-w-[1200px]">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Latest News</h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Stay updated with announcements, events, and community stories.
                        </p>
                    </div>
                    {auth?.user?.isAdmin && (
                        <Link
                            href={route('news.create')}
                            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/>
                            </svg>
                            Post News
                        </Link>
                    )}
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {news?.data?.length > 0 ? (
                        news.data.map((item) => (
                            <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">
                                            announcement
                                        </span>
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                            {new Date(item.published_at || item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight capitalize">
                                        {safe(item.title)}
                                    </h3>
                                    <p className="text-slate-500 font-medium line-clamp-3 mb-8">
                                        {item.content}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                                                {item.user?.name?.charAt(0) || '?'}
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{safe(item.user?.name)}</span>
                                        </div>
                                        <Link
                                            href="#"
                                            className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-500 flex items-center gap-2 group/link"
                                        >
                                            READ STORY
                                            <svg className="w-3 h-3 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white rounded-3xl border border-slate-100 p-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 text-slate-200">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-400 mb-2">No news stories yet</h3>
                            <p className="text-slate-400 font-medium max-w-xs">Stay tuned for the latest updates from the community.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {news?.links && news.links.length > 3 && (
                    <div className="mt-12 py-6 flex items-center justify-center gap-1">
                        {news.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                    link.active
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : !link.url
                                      ? 'text-slate-200 cursor-not-allowed'
                                      : 'text-slate-500 hover:bg-white hover:text-indigo-600 border border-transparent hover:border-slate-100 shadow-sm'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

