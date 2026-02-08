'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Edit3, CheckCircle, XCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { getAllEventsAdmin, updateEventStatus } from '@/lib/api';
import { Event } from '@/types';

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const data = await getAllEventsAdmin();
            setEvents(data);
        } catch (err) {
            console.error('Failed to fetch events:', err);
            setError('Could not load events. Check if your backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await updateEventStatus(id, newStatus);
            setEvents(events.map(ev => ev.id === id ? { ...ev, status: newStatus as Event['status'] } : ev));
        } catch (err) {
            console.error('Status update failed:', err);
            alert('Failed to update status. Only Admins can perform this action.');
        }
    };


    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PUBLISHED': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'CANCELED': return <XCircle className="w-4 h-4 text-red-500" />;
            default: return <Clock className="w-4 h-4 text-orange-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end bg-gray-100 p-6 rounded-4xl">
                <Link
                    href="/admin/events/new"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
                >
                    <Plus className="w-4 h-4" />
                    New Event
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 p-6 rounded-4xl flex items-center gap-4 text-red-600 font-bold">
                    <AlertCircle className="w-6 h-6" />
                    {error}
                </div>
            )}

            <div className="bg-white rounded-[3rem] shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Event Details</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Schedule</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-8 py-8"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                                    </tr>
                                ))
                            ) : events.length > 0 ? (
                                events.map((event) => (
                                    <tr key={event.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">
                                                    <Ticket className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 leading-none mb-1">{event.title}</p>
                                                    <p className="text-xs font-bold text-gray-400">{event.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-gray-900">
                                                {new Date(event.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                            <p className="text-[10px] font-black uppercase text-gray-400">
                                                {new Date(event.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(event.status)}
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${event.status === 'PUBLISHED' ? 'text-green-600' :
                                                    event.status === 'CANCELED' ? 'text-red-600' : 'text-orange-600'
                                                    }`}>
                                                    {event.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/events/${event.id}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200"
                                                    title="Preview"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>

                                                {event.status !== 'PUBLISHED' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(event.id, 'PUBLISHED')}
                                                        className="p-2 text-green-500 hover:bg-green-50 rounded-xl transition-all"
                                                        title="Publish"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                )}

                                                {event.status !== 'CANCELED' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(event.id, 'CANCELED')}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Cancel"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-bold">
                                        No events found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


function Ticket({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M13 5v2" />
            <path d="M13 17v2" />
            <path d="M13 11v2" />
        </svg>
    )
}
