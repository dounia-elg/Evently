'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle, User as UserIcon, Calendar, Mail } from 'lucide-react';
import { getAllReservationsAdmin, updateReservationStatus } from '@/lib/api';
import { Reservation } from '@/types';

export default function AdminReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const data = await getAllReservationsAdmin();
            setReservations(data);
        } catch (err: any) {
            console.error('Failed to fetch reservations:', err);
            setError('Could not load reservations. Check if your backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await updateReservationStatus(id, newStatus);
            setReservations(reservations.map(res => res.id === id ? { ...res, status: newStatus as any } : res));
        } catch (err: any) {
            console.error('Status update failed:', err);
            alert(err.response?.data?.message || 'Failed to update reservation status.');
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'text-green-600 bg-green-50 border-green-100';
            case 'REFUSED': return 'text-red-600 bg-red-50 border-red-100';
            case 'CANCELED': return 'text-gray-400 bg-gray-50 border-gray-100';
            default: return 'text-orange-600 bg-orange-50 border-orange-100';
        }
    };

    return (
        <div className="space-y-6">

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
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Participant</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Target Experience</th>
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
                            ) : reservations.length > 0 ? (
                                reservations.map((res) => (
                                    <tr key={res.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                                    <UserIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 leading-none mb-1">
                                                        {res.participant.firstName} {res.participant.lastName}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                                        <Mail className="w-3 h-3" />
                                                        {res.participant.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-300" />
                                                <div>
                                                    <p className="text-sm font-black text-gray-900">{res.event.title}</p>
                                                    <p className="text-[10px] font-black uppercase text-gray-400">
                                                        {new Date(res.event.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyles(res.status)}`}>
                                                {res.status === 'CONFIRMED' && <CheckCircle className="w-3 h-3" />}
                                                {res.status === 'REFUSED' && <XCircle className="w-3 h-3" />}
                                                {res.status === 'PENDING' && <Clock className="w-3 h-3" />}
                                                {res.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {res.status === 'PENDING' && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(res.id, 'CONFIRMED')}
                                                        className="px-4 py-2 bg-green-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all active:scale-95 shadow-sm"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(res.id, 'REFUSED')}
                                                        className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all active:scale-95"
                                                    >
                                                        Refuse
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-bold">
                                        No reservations yet.
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
