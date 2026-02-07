import { getPublishedEvents } from '@/lib/api';
import { Event } from '@/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Calendar, MapPin, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  let events: Event[] = [];
  let error = null;

  try {
    // SSR Fetch from Backend
    events = await getPublishedEvents();
  } catch (e) {
    error = "Failed to load events. Is the backend running?";
    console.error(e);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-200">
        <Hero />

        {/* Creative Events Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-20">
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                Upcoming
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-rose-600 to-amber-600">  Experiences</span>
              </h2>
            </div>
            <div className="hidden md:block">
              <button className="px-10 py-4 bg-white border-2 border-gray-900 text-gray-900 font-black rounded-full hover:bg-gray-900 hover:text-white transition-all active:scale-95 shadow-lg shadow-gray-100 uppercase tracking-widest text-xs">
                See All Category
              </button>
            </div>
          </div>

          {events.length === 0 && !error ? (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group">
              <p className="text-gray-400 font-black uppercase tracking-widest relative z-10">No Events Found</p>
              <p className="text-gray-300 mt-2 font-medium relative z-10 italic">Check back shortly for new inspirations.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group relative flex flex-col h-full transition-all duration-500 hover:-translate-y-4"
                >
                  {/* Creative Ticket Card */}
                  <div className="relative bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col grow">

                    {/* Top Section - Color Block */}
                    <div className="h-4 bg-red-600"></div>

                    {/* Main Content Area */}
                    <div className="p-10 flex flex-col grow">
                      {/* Date Badge - Floating Creative Layout */}
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex flex-col">
                          <span className="text-4xl font-black text-gray-900 leading-none">
                            {new Date(event.dateTime).getDate()}
                          </span>
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mt-1">
                            {new Date(event.dateTime).toLocaleString('en-US', { month: 'short' })}
                          </span>
                        </div>
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all shadow-inner border border-gray-100 text-gray-300">
                          <Ticket size={24} />
                        </div>
                      </div>

                      <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-4 group-hover:text-orange-600 transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-gray-500 font-medium leading-relaxed line-clamp-2 mb-8 grow">
                        {event.description}
                      </p>

                      {/* Ticket Perforation Effect (CSS Only) */}
                      <div className="relative py-8 border-t border-dashed border-gray-200">
                        {/* Punch Holes */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full shadow-inner border border-gray-100"></div>
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full shadow-inner border border-gray-100"></div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-sm text-gray-800 font-bold">
                            <MapPin size={18} className="text-rose-500" />
                            <span className="truncate">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-800 font-bold">
                            <Calendar size={18} className="text-orange-500" />
                            <span>{new Date(event.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/events/${event.id}`}
                        className="w-full py-5 bg-gray-900 text-white rounded-4xl font-black text-lg transition-all flex items-center justify-center gap-3 hover:bg-black active:scale-95 shadow-xl shadow-gray-200 mt-4 group/btn text-center"
                      >
                        Get Ticket
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Creative Offset Decoration */}
                  <div className="absolute -z-10 bottom-2.5 -left-2.5 w-full h-full bg-linear-to-br from-orange-200/20 to-rose-200/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

    </>
  );
}

// Minimalist Ticket Icon Component
function Ticket({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9V5.2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2V9a2 2 0 0 0 0 6v3.8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V15a2 2 0 0 0 0-6z" />
      <line x1="15" y1="3" x2="15" y2="21" strokeDasharray="4 4" />
    </svg>
  );
}
