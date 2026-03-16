import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import HoopHubLogo from '@/Components/HoopHubLogo';


export default function Welcome({ auth, canLogin, canRegister, status, canResetPassword }) {
    const [view, setView] = useState('landing'); // 'landing', 'login', 'register'

    // Login Form
    const loginForm = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Register Form
    const registerForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        loginForm.post(route('login'), {
            onFinish: () => loginForm.reset('password'),
        });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        registerForm.post(route('register'), {
            onFinish: () => registerForm.reset('password', 'password_confirmation'),
        });
    };

    const toggleView = (newView) => {
        setView(newView);
    };

    return (
        <div className="relative min-h-screen font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
            <Head title="Welcome to HoopHub" />

            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/basketball-bg.png"
                    alt="Basketball Court"
                    className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
                
                {/* Landing View */}
                {view === 'landing' && (
                    <div className="text-center max-w-2xl transform transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-8">
                        <HoopHubLogo size="xl" hideText={true} className="mx-auto mb-8" />
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
                            Welcome to <span className="text-indigo-400">HoopHub</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10 max-w-xl mx-auto opacity-90">
                            The all-in-one platform to manage your basketball community.
                            Schedule events, track attendance, and keep everyone connected.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
                                >
                                    Enter Dashboard
                                </Link>
                            ) : (
                                <button
                                    onClick={() => toggleView('login')}
                                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
                                >
                                    Enter Dashboard
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Login View */}
                {view === 'login' && (
                    <div className="w-full max-w-md transform transition-all duration-500 ease-out animate-in zoom-in-95 fade-in">
                        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10 border border-white/20">
                            <div className="flex flex-col items-center mb-8">
                                <HoopHubLogo size="lg" hideText={true} className="mb-4" />
                                <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                                <p className="text-gray-500 mt-2">Sign in to manage your community.</p>
                            </div>

                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 italic">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={handleLoginSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-semibold" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={loginForm.data.email}
                                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => loginForm.setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                    />
                                    <InputError message={loginForm.errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <div className="flex justify-between">
                                        <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-semibold" />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={loginForm.data.password}
                                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        autoComplete="current-password"
                                        onChange={(e) => loginForm.setData('password', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <InputError message={loginForm.errors.password} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer group">
                                        <Checkbox
                                            name="remember"
                                            checked={loginForm.data.remember}
                                            onChange={(e) => loginForm.setData('remember', e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <button
                                    className={`w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${loginForm.processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    disabled={loginForm.processing}
                                >
                                    {loginForm.processing ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => toggleView('register')}
                                        className="text-indigo-600 hover:text-indigo-500 font-bold underline underline-offset-4"
                                    >
                                        Sign up
                                    </button>
                                </p>
                                <button
                                    onClick={() => toggleView('landing')}
                                    className="mt-6 text-gray-400 hover:text-gray-600 text-sm flex items-center justify-center gap-1 mx-auto transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to landing
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Register View */}
                {view === 'register' && (
                    <div className="w-full max-w-md transform transition-all duration-500 ease-out animate-in zoom-in-95 fade-in">
                        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10 border border-white/20">
                            <div className="flex flex-col items-center mb-8">
                                <HoopHubLogo size="lg" hideText={true} className="mb-4" />
                                <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                                <p className="text-gray-500 mt-2">Join the HoopHub community today.</p>
                            </div>

                            <form onSubmit={handleRegisterSubmit} className="space-y-5">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" className="text-gray-700 font-semibold" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={registerForm.data.name}
                                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => registerForm.setData('name', e.target.value)}
                                        required
                                        placeholder="Full Name"
                                    />
                                    <InputError message={registerForm.errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-semibold" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={registerForm.data.email}
                                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        autoComplete="username"
                                        onChange={(e) => registerForm.setData('email', e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                    />
                                    <InputError message={registerForm.errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-semibold" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={registerForm.data.password}
                                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        autoComplete="new-password"
                                        onChange={(e) => registerForm.setData('password', e.target.value)}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <InputError message={registerForm.errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-700 font-semibold" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={registerForm.data.password_confirmation}
                                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        autoComplete="new-password"
                                        onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <InputError message={registerForm.errors.password_confirmation} className="mt-2" />
                                </div>

                                <button
                                    className={`w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-2 ${registerForm.processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    disabled={registerForm.processing}
                                >
                                    {registerForm.processing ? 'Creating account...' : 'Create Account'}
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => toggleView('login')}
                                        className="text-indigo-600 hover:text-indigo-500 font-bold underline underline-offset-4"
                                    >
                                        Sign in
                                    </button>
                                </p>
                                <button
                                    onClick={() => toggleView('landing')}
                                    className="mt-6 text-gray-400 hover:text-gray-600 text-sm flex items-center justify-center gap-1 mx-auto transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to landing
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Animations Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-in-from-bottom { from { transform: translateY(2rem); } to { transform: translateY(0); } }
                @keyframes zoom-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                
                .animate-in {
                    animation-duration: 600ms;
                    animation-fill-mode: both;
                    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
                }
                .fade-in { animation-name: fade-in; }
                .slide-in-from-bottom-8 { animation-name: slide-in-from-bottom; }
                .zoom-in-95 { animation-name: zoom-in; }
            ` }} />
        </div>
    );
}
