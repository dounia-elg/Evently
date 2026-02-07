'use client';

import Link from 'next/link';
import { Ticket, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200 group-hover:rotate-6 transition-transform">
                            <Ticket className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900">
                            Event<span className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">ly</span>
                        </span>
                    </Link>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4 sm:gap-8">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-900 font-black text-sm uppercase tracking-widest hover:text-orange-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 sm:px-10 py-3 sm:py-4 bg-gray-900 text-white font-black rounded-full hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200/50 uppercase tracking-widest text-[10px] sm:text-xs"
                                >
                                    Join Now
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-6">
                                <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                                        <UserIcon className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-black text-gray-900">
                                        {user?.firstName}
                                    </span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="w-6 h-6" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
