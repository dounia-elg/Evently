import { getPublishedEvents } from '@/lib/api';
import { Event } from '@/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default async function Home() {
  let events: Event[] = [];
  let error = null;

  try {
    events = await getPublishedEvents();
  } catch (e) {
    error = "Failed to load events. Is the backend running?";
    console.error(e);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <Hero />

        {/* Events Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-500 font-medium">Be part of the most awaited experiences</p>
            </div>
            <div className="hidden sm:block">
              <button className="text-blue-600 font-semibold hover:underline flex items-center gap-1 transition-all">
                Browse all categories <span>→</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3 animate-shake">
              <span className="text-xl">⚠️</span> {error}
            </div>
          )}

          {events.length === 0 && !error ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <span className="text-5xl mb-4 block">🎟️</span>
              <p className="text-gray-500 font-medium italic text-lg">No published events found. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Card Header/Image Placeholder */}
                  <div className="relative h-56 bg-gradient-to-br from-blue-500 to-indigo-700 p-6 flex items-end">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    <div className="relative z-10 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full w-fit border border-white/30">
                        {new Date(event.dateTime) > new Date() ? 'Coming Soon' : 'Started'}
                      </span>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8">
                    <p className="text-gray-500 leading-relaxed mb-6 line-clamp-2 min-h-[3rem]">
                      {event.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-gray-700">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mr-4 text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          📍
                        </div>
                        <span className="font-semibold">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mr-4 text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          ⏰
                        </div>
                        <span className="font-semibold">{new Date(event.dateTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-gray-50 hover:bg-blue-600 text-gray-900 hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group/btn active:scale-95">
                      Get Your Tickets
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-medium">© 2026 Evently Platform. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
