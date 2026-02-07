import { Calendar, Ticket, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-amber-100/50 to-orange-100/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-rose-100/50 to-pink-100/30 rounded-full blur-[120px] animate-pulse delay-700"></div>

                {/* Subtle Subtle Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 48c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM6 48c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM54 6c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM6 6c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4z' fill='%23000' fill-opacity='0.4' fill-rule='evenodd' border='none'/%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm">
                            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                                The Premium Event Platform
                            </span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-6">
                            <h1 className="text-6xl lg:text-8xl font-black text-gray-900 tracking-tight leading-[0.9]">
                                Create <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600">
                                    Memories
                                </span> <br />
                                Together.
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                                Join the most exclusive community of event lovers.
                                Find your next inspiration or host your own masterpiece.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-bold text-lg shadow-2xl hover:bg-black transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-[2rem] font-bold text-lg hover:border-gray-900 transition-all hover:scale-105 active:scale-95">
                                View Events
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 pt-10">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <p className="font-bold text-gray-900">Joined by 10k+ people</p>
                                <p className="text-gray-500">Discovering events every day</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Visual Section */}
                    <div className="relative lg:block">
                        {/* Main Image Decoration */}
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-red-600">
                            <img
                                src="https://www.prestagency.com/photos/590x662/technique_led1.jpg"
                                alt="Event Atmosphere"
                                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                            />

                            {/* Overlay Card */}
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[85%] bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Coming Soon</span>
                                    <span className="text-gray-400 text-xs font-medium">Limited Seats</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Summer Gala 2026</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4 text-orange-500" />
                                        <span>July 12</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="w-4 h-4 text-rose-500" />
                                        <span>Trending</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
