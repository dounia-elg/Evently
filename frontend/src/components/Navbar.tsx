import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all">
                            Evently
                        </span>
                    </Link>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md shadow-blue-200 transition-all active:scale-95"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
