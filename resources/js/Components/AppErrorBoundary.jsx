import React from 'react';

class AppErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error('AppErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Development - show stack trace
            if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
                return (
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
                        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                            <div className="p-8 bg-red-50 border-b border-red-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900">Something went wrong</h1>
                                        <p className="text-slate-600 mt-1">Check console for details.</p>
                                    </div>
                                </div>
                            </div>
                            <pre className="p-8 text-sm font-mono text-slate-800 bg-slate-50 max-h-96 overflow-auto">
                                <strong>Error:</strong> {this.state.error?.toString()}\n\n
                                <strong>Stack trace:</strong>\n{this.state.errorInfo?.componentStack}
                            </pre>
                            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg"
                                >
                                    Reload App
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }

            // Production - friendly error
            return (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 text-center p-12">
                        <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-slate-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 mb-4">Something went wrong</h1>
                        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                            We're working to fix this. Please refresh the page or try again later.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-500/10"
                            >
                                Reload Page
                            </button>
                            <a
                                href="/"
                                className="block px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                            >
                                Go to Home
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default AppErrorBoundary;
