import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        is_published: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('news.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Create News Post" />

            <div className="max-w-[800px]">
                <div className="mb-10">
                    <Link 
                        href={route('news.index')}
                        className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-[0.2em] flex items-center gap-2 mb-4 group"
                    >
                        <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                        Back to News
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Post New Story</h1>
                    <p className="text-slate-500 mt-2 font-medium">Broadcast announcements and updates to the community.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10 space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Headline</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter a catchy title..."
                            className={`w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all font-bold text-gray-900 placeholder-slate-300 ${errors.title ? 'ring-2 ring-red-500' : ''}`}
                        />
                        {errors.title && <p className="text-xs font-bold text-red-500 mt-1 ml-1">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Content</label>
                        <textarea
                            rows="8"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Share the details with the club..."
                            className={`w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all font-medium text-gray-700 placeholder-slate-300 resize-none ${errors.content ? 'ring-2 ring-red-500' : ''}`}
                        ></textarea>
                        {errors.content && <p className="text-xs font-bold text-red-500 mt-1 ml-1">{errors.content}</p>}
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">Publish Immediately</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">This will send a notification to all members.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                            />
                            <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'PUBLISHING...' : 'POST STORY'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
