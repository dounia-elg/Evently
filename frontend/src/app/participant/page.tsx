'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getMyReservations, cancelReservation, downloadTicket } from '@/lib/api';
import { Reservation } from '@/types';
import Navbar from '@/components/Navbar';
import { Ticket as TicketIcon, Calendar, MapPin, Download, Trash2, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ParticipantDashboard() {
    const { user } = useAuth();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            fetchMyReservations();
        }
    }, [user]);

    const fetchMyReservations = async () => {
        setLoading(true);
        try {
            const data = await getMyReservations();
            setReservations(data);
        } catch (err) {
            console.error('Failed to load dashboard:', err);
            setError('Could not fetch your reservations. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id: string) => {
        if (!confirm('Are you sure you want to cancel this reservation?')) return;

        try {
            await cancelReservation(id);
            setReservations(reservations.filter(r => r.id !== id));
            alert('Reservation canceled successfully.');
        } catch (err) {
            console.error('Cancellation failed:', err);
            alert('Failed to cancel reservation.');
        }
    };

    const handleDownload = async (reservationId: string, eventTitle: string) => {
        try {
            const blob = await downloadTicket(reservationId);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Ticket-${eventTitle.replace(/\s+/g, '-')}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Download failed:', err);
            alert('Could not download ticket. Is your reservation confirmed?');
        }
    };

    const getStatusHeader = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-green-600';
            case 'REFUSED': return 'bg-red-600';
            case 'CANCELED': return 'bg-gray-400';
            default: return 'bg-orange-500';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase leading-none">My Dashboard</h1>
                        <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-xs">
                            Active Protocols: {reservations.length} Experiences
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-4xl font-bold flex items-center gap-4 mb-8">
                        <AlertCircle className="w-6 h-6" />
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {loading ? (
                        [1, 2].map(i => (
                            <div key={i} className="h-64 bg-gray-200 rounded-[3rem] animate-pulse"></div>
                        ))
                    ) : reservations.length > 0 ? (
                        reservations.map((res) => (
                            <div key={res.id} className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100 group hover:scale-[1.01] transition-all flex flex-col sm:flex-row">
                                {/* Ticket Left Stub - Decorative */}
                                <div className={`w-full sm:w-24 ${getStatusHeader(res.status)} flex flex-col items-center justify-center p-6 text-white sm:border-r border-dashed border-white/20 relative`}>
                                    <TicketIcon className="w-10 h-10 opacity-30 sm:rotate-90" />
                                    <p className="hidden sm:block text-[10px] font-black uppercase tracking-widest opacity-40 rotate-90 mt-12 whitespace-nowrap">
                                        EXPERIENCE PASS
                                    </p>
                                    {/* Perforation Circles */}
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-gray-50 rounded-full translate-x-1/2 -translate-y-1/2 hidden sm:block"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-50 rounded-full translate-x-1/2 translate-y-1/2 hidden sm:block"></div>
                                </div>

                                {/* Main Body */}
                                <div className="flex-1 p-8 sm:p-10 relative">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${res.status === 'CONFIRMED' ? 'bg-green-50 text-green-600 border-green-100' :
                                            res.status === 'REFUSED' ? 'bg-red-50 text-red-600 border-red-100' :
                                                res.status === 'CANCELED' ? 'bg-gray-50 text-gray-400 border-gray-100' :
                                                    'bg-orange-50 text-orange-600 border-orange-100'
                                            }`}>
                                            {res.status}
                                        </div>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                            ID: {res.id.slice(0, 8)}
                                        </p>
                                    </div>

                                    <Link href={`/events/${res.event.id}`}>
                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-red-600 transition-colors uppercase tracking-tighter">
                                            {res.event.title}
                                        </h3>
                                    </Link>

                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                                            <Calendar className="w-4 h-4 text-red-500" />
                                            {new Date(res.event.dateTime).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            {res.event.location}
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {res.status === 'CONFIRMED' && (
                                                <button
                                                    onClick={() => handleDownload(res.id, res.event.title)}
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                    Download Ticket
                                                </button>
                                            )}
                                            {(res.status === 'PENDING' || res.status === 'CONFIRMED') && (
                                                <button
                                                    onClick={() => handleCancel(res.id)}
                                                    className="inline-flex items-center gap-2 px-6 py-3 text-red-600 hover:bg-red-50 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    Cancel
                                                </button>
                                            )}
                                        </div>

                                        <div className="w-12 h-12 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                                            {res.status === 'CONFIRMED' ? <CheckCircle className="w-full h-full text-green-600" /> :
                                                res.status === 'REFUSED' ? <XCircle className="w-full h-full text-red-600" /> :
                                                    <Clock className="w-full h-full text-orange-600" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 bg-white rounded-[4rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                                <TicketIcon className="w-10 h-10 text-gray-200" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">No Active Protocols</h3>
                            <p className="text-gray-500 font-bold max-w-xs mt-2">
                                You haven&apos;t reserved any experiences yet. Browse the platform to join in.
                            </p>
                            <Link
                                href="/"
                                className="mt-8 px-8 py-4 bg-red-600 text-white rounded-4xl font-black uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95"
                            >
                                Start Discovering
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
