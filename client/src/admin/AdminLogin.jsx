import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Cpu, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AdminLogin() {
    const [username, setUsername] = useState(''); // Use email in Supabase
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: username,
                password: password,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            localStorage.setItem('lrnit_user', data.user.email);
            navigate('/lrnit-admin/dashboard');
        } catch (err) {
            setError('Unable to connect to Supabase.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deepCircuitBlue via-[#0a192f] to-[#0d1b2a] relative overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primaryTechBlue/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-innovationPurple/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 mb-4">
                        <Cpu className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        LRN<span className="text-innovationPurple">it</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-xl font-semibold text-white mb-6">Sign in to continue</h2>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primaryTechBlue/50 focus:border-primaryTechBlue/50 transition"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primaryTechBlue/50 focus:border-primaryTechBlue/50 transition"
                                    placeholder="Enter password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primaryTechBlue hover:bg-blue-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-primaryTechBlue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-600 text-xs mt-6">
                    &copy; {new Date().getFullYear()} LRNit. Authorized personnel only.
                </p>
            </div>
        </div>
    );
}
