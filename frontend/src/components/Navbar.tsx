import Link from 'next/link';
import { Ticket } from 'lucide-react';

export default function Navbar() {
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
                    <div className="flex items-center gap-6">
                        <Link
                            href="/login"
                            className="text-gray-600 hover:text-orange-600 font-bold transition-colors hidden sm:block"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="relative group px-7 py-3 bg-gray-900 text-white rounded-2xl font-bold transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
                        >
                            <span className="relative z-10">Sign Up</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
