'use client';

import { TrendingUp, Calendar, Users, Activity } from 'lucide-react';

export default function AdminPage() {
    const stats = [
        { name: 'Total Events', value: '12', icon: Calendar, color: 'bg-blue-500' },
        { name: 'Active Reservations', value: '48', icon: Users, color: 'bg-green-500' },
        { name: 'Platform Traffic', value: '+25%', icon: TrendingUp, color: 'bg-orange-500' },
        { name: 'System Status', value: 'Healthy', icon: Activity, color: 'bg-red-500' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200 flex items-center gap-4 group hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{stat.name}</p>
                            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-200 min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                    <LayoutDashboard className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Admin Console Initialized</h3>
                <p className="text-gray-500 font-bold max-w-sm mt-2">
                    Select a section from the sidebar to start managing your events and community.
                </p>
            </div>
        </div>
    );
}


function LayoutDashboard({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    )
}
