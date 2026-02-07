import { getEventById } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { Calendar, MapPin, Users, ArrowLeft, Ticket } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let event;
    try {
        event = await getEventById(id);
    } catch (error) {
        console.error('Error fetching event:', error);
        return notFound();
    }

    if (!event) return notFound();

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-200 pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Experiences
                    </Link>

                    {/* Creative Event Detail Card (Ticket Inspired) */}
                    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[600px]">

                        {/* Left Side - Visual/Status (Red Bar Concept) */}
                        <div className="md:w-1/3 bg-red-600 p-12 flex flex-col justify-between text-white relative overflow-hidden">
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                            }}></div>

                            <div className="relative z-10">
                                <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30 w-fit mb-8">
                                    Official Access
                                </div>
                                <h1 className="text-5xl font-black tracking-tighter leading-[0.9] mb-6">
                                    {event.title}
                                </h1>
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                                        <Ticket className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Entry ID</p>
                                        <p className="font-bold text-sm tracking-mono">#{event.id.slice(0, 8).toUpperCase()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Details */}
                        <div className="md:w-2/3 p-12 lg:p-16 flex flex-col justify-between relative">
                            {/* Perforation Effect */}
                            <div className="hidden md:block absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full border border-gray-100 shadow-inner"></div>

                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange-600">Experience Details</h2>
                                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                        {event.description}
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-8 pt-10 border-t border-gray-50">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                                            <MapPin className="w-7 h-7 text-rose-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location</p>
                                            <p className="text-lg font-black text-gray-900 tracking-tight">{event.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                                            <Calendar className="w-7 h-7 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date & Time</p>
                                            <p className="text-lg font-black text-gray-900 tracking-tight">
                                                {new Date(event.dateTime).toLocaleString('en-US', {
                                                    weekday: 'long',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                                            <Users className="w-7 h-7 text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Capacity</p>
                                            <p className="text-lg font-black text-gray-900 tracking-tight">{event.maxCapacity} Guests max</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16">
                                <button className="w-full py-6 bg-gray-900 text-white rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-4">
                                    Reserve My Spot 🎫
                                </button>
                                <p className="text-center text-gray-400 text-xs mt-6 font-bold uppercase tracking-widest">
                                    Secured by Evently Platform
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
