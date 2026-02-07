'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createEvent } from '@/lib/api';
import { Ticket, ArrowLeft, Calendar, MapPin, Users, Type, AlignLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewEventPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dateTime: '',
        location: '',
        maxCapacity: 100,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createEvent({
                ...formData,
                maxCapacity: Number(formData.maxCapacity),
            });
            router.push('/admin/events');
        } catch (err: any) {
            console.error('Failed to create event:', err);
            setError(err.response?.data?.message || 'Failed to create event. Please check your data.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <Link
                href="/admin/events"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 font-bold text-sm transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Events
            </Link>

            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col relative">
                {/* Header Ticket Section */}
                <div className="bg-red-600 p-10 flex justify-between items-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                            <Ticket className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">New Protocol</h1>
                            <p className="text-red-100 text-xs font-bold uppercase tracking-widest mt-1">Creation Authority: {user?.firstName}</p>
                        </div>
                    </div>
                </div>

                {/* Form Body */}
                <div className="p-10 lg:p-16 relative">
                    {/* Perforation Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 border-t-2 border-dashed border-gray-100 -translate-y-px"></div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Event Identity (Title)</label>
                                    <div className="relative">
                                        <Type className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-bold placeholder:text-gray-300"
                                            placeholder="The Grand Experience"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Launch Date & Time</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="datetime-local"
                                            name="dateTime"
                                            required
                                            value={formData.dateTime}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Location Coordinates</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="location"
                                            required
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-bold placeholder:text-gray-300"
                                            placeholder="Experience Center, NY"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Maximum Capacity</label>
                                    <div className="relative">
                                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="number"
                                            name="maxCapacity"
                                            required
                                            min="1"
                                            value={formData.maxCapacity}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-bold"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <div className="space-y-2 h-full flex flex-col">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Detailed Description</label>
                                    <div className="relative flex-1">
                                        <AlignLeft className="absolute left-5 top-6 w-4 h-4 text-gray-400" />
                                        <textarea
                                            name="description"
                                            required
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-bold placeholder:text-gray-300 resize-none h-full min-h-75"
                                            placeholder="Provide a compelling overview of what participants should expect..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-50 flex justify-end items-center gap-6">
                            <Link href="/admin/events" className="text-sm font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest">
                                Discard Draft
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-10 py-5 bg-gray-900 text-white rounded-3xl font-black text-lg shadow-2xl hover:bg-black transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 uppercase tracking-tighter"
                            >
                                {loading ? 'Initializing Protocol...' : 'Launch Experience'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
