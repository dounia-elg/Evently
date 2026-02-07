'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Ticket, ArrowRight, User, Mail, Lock, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { registerUser } from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
            await registerUser(formData);
            router.push('/login?registered=true');
        } catch (err: any) {
            console.error('Registration failed:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                <div className="max-w-4xl w-full">
                    {/* The Registration Ticket */}
                    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-96 relative group">

                        {/* Decorative Gradient Background (Behind card on hover) */}
                        <div className="absolute -z-10 inset-0 bg-linear-to-br from-orange-200/30 to-rose-200/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        {/* Left Side - Visual Sidebar (Red Concept) */}
                        <div className="md:w-5/12 bg-red-600 p-12 flex flex-col justify-between text-white relative overflow-hidden">
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                            }}></div>

                            <div className="relative z-10">
                                <Link href="/" className="inline-flex w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl items-center justify-center border border-white/30 mb-12 hover:scale-110 transition-transform">
                                    <Ticket className="w-6 h-6" />
                                </Link>
                                <h1 className="text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9] mb-6">
                                    Become<br />a Member.
                                </h1>
                                <p className="text-red-100 font-medium text-lg leading-tight">
                                    Join the most exclusive event community today.
                                </p>
                            </div>

                            <div className="relative z-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                                            <Sparkles className="w-5 h-5 text-amber-300" />
                                        </div>
                                        <p className="font-bold text-sm">Premium Access</p>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                                        Evently Protocol v1.0
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="md:w-7/12 p-8 lg:p-16 flex flex-col justify-center relative bg-white">
                            {/* Perforation Effect */}
                            <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full border border-gray-100 shadow-inner"></div>

                            <div className="max-w-md mx-auto w-full space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
                                    <p className="text-gray-500 font-bold">Start your experience journey</p>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold animate-shake">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">First Name</label>
                                            <div className="relative">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-bold placeholder:text-gray-300"
                                                    placeholder="Your First Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-bold placeholder:text-gray-300"
                                                placeholder="Your Last Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
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
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Secure Password</label>
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
                                        className="w-full py-6 bg-gray-900 text-white rounded-4xl font-black text-lg shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-4 mt-4 disabled:opacity-50 disabled:scale-100 group/btn"
                                    >
                                        {loading ? 'Creating Entry...' : 'Join the Experience'}
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </form>

                                <p className="text-center text-gray-400 text-sm font-bold">
                                    Already have a ticket?{' '}
                                    <Link href="/login" className="text-red-600 hover:text-red-700 underline underline-offset-4 decoration-2">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
