'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Ticket, ArrowRight, Mail, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { loginUser } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isRegistered = searchParams.get('registered') === 'true';
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(formData);
            login(data);

            router.push('/');
        } catch (err: any) {
            console.error('Login failed:', err);
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-200 flex items-center justify-center p-4 pt-32 pb-20">
                <div className="max-w-md w-full">
                    {/* The Login Ticket Stub */}
                    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col relative group">

                        {/* Top Section - Brand/Status */}
                        <div className="bg-red-600 p-8 flex justify-between items-center text-white relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                            }}></div>

                            <div className="relative z-10 flex items-center gap-3">
                                <Ticket className="w-6 h-6" />
                                <h1 className="text-xl font-black tracking-tighter uppercase">Access Key</h1>
                            </div>
                            <div className="relative z-10 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
                                Verified
                            </div>
                        </div>

                        {/* Main Body */}
                        <div className="p-10 lg:p-12 space-y-8 relative">
                            {/* Perforation Line */}
                            <div className="absolute top-0 left-0 right-0 h-1 border-t-2 border-dashed border-gray-100 -translate-y-px"></div>

                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight text-center">Login</h2>
                                <p className="text-gray-500 font-bold text-center text-sm">Welcome back to Evently</p>
                            </div>

                            {isRegistered && !error && (
                                <div className="p-4 bg-orange-50 border border-orange-100 text-orange-600 rounded-2xl text-xs font-black text-center animate-bounce">
                                    Registration Successful! Please login.
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold text-center">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Identifier (Email)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-bold placeholder:text-gray-300"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secret Token</label>
                                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors">Forgot?</Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-bold placeholder:text-gray-300"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={loading}
                                    className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-4 mt-6 disabled:opacity-50 disabled:scale-100 group/btn"
                                >
                                    {loading ? 'Authenticating...' : 'Enter Platform'}
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </form>

                            <div className="pt-4 text-center">
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                                    No ticket yet?{' '}
                                    <Link href="/register" className="text-red-600 hover:text-red-700 underline underline-offset-4 decoration-2">
                                        Join Experience
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Creative Footer - Stub Info */}
                        <div className="bg-gray-50 p-6 flex justify-center items-center border-t border-gray-100">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                                Evently Auth Protocol • Security Layer
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
