'use client';

import Link from 'next/link';
import { LayoutDashboard, Calendar, Users, Home, LogOut, Ticket } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { logout, user } = useAuth();
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Events', href: '/admin/events', icon: Calendar },
        { name: 'Reservations', href: '/admin/reservations', icon: Users },
    ];

    return (
        <ProtectedRoute requiredRole="ADMIN">
            <div className="min-h-screen bg-gray-100 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-50">
                    <div className="h-20 flex items-center gap-2 px-6 border-b border-gray-800">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <Ticket className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter">
                            Admin<span className="text-red-500">Panel</span>
                        </span>
                    </div>

                    <nav className="flex-1 p-4 space-y-2 mt-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive
                                            ? 'bg-red-600 text-white shadow-lg shadow-red-900/20'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-800 space-y-4">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white font-bold transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            Back to Site
                        </Link>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-bold rounded-xl transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 ml-64 p-8">
                    <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                                {navItems.find(i => i.href === pathname)?.name || 'Admin'}
                            </h2>
                            <p className="text-gray-500 font-bold text-sm">Managing Evently Ecosystem</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-black text-gray-900">{user?.firstName} {user?.lastName}</p>
                                <p className="text-[10px] font-black uppercase text-red-600 tracking-widest">Platform Admin</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200">
                                <Users className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>
                    </header>
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
