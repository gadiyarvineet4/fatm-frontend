
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export function EntryPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithPopup(auth, googleProvider);
            // Successful sign-in, redirect to home
            navigate('/');
        } catch (err: any) {
            console.error("Google Sign-In Error:", err);
            // If config is missing/invalid, show a helpful message
            if (err.code === 'auth/configuration-not-found' || err.code === 'auth/project-not-found') {
                setError('Firebase configuration missing. Please check console.');
            } else {
                setError('Failed to sign in. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGuestAccess = () => {
        // For guest access, we just navigate to home
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-fatm-cream relative overflow-hidden">
            {/* Background decoration */}
            <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none -z-10"></div>

            <div className="w-full max-w-md px-6 py-12 bg-white/50 backdrop-blur-sm shadow-xl rounded-2xl border border-white/40 animate-fade-in-up transition-all duration-700 hover:shadow-2xl">
                <header className="text-center mb-10 space-y-2">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-fatm-charcoal">
                        Welcome
                    </h1>
                    <p className="text-gray-500 font-light tracking-wide uppercase text-sm">
                        Gateway to Cinema
                    </p>
                </header>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full group relative flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-gray-400 border-t-fatm-charcoal rounded-full animate-spin"></span>
                        ) : (
                            <>
                                {/* Google Logo SVG */}
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        className="text-blue-500"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        className="text-green-500"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        className="text-yellow-500"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        className="text-red-500"
                                    />
                                </svg>
                                <span className="font-medium">Sign in with Google</span>
                            </>
                        )}
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300/60"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-fatm-cream text-gray-400 font-mono">or</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGuestAccess}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-fatm-charcoal text-white rounded-lg hover:bg-black w-full text-center font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Back to Home
                    </button>
                </div>

                {error && (
                    <div className="mt-6 p-3 bg-red-50 border border-red-100 rounded text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}
            </div>

            <div className="mt-12 max-w-lg mx-auto text-center px-6 animate-fade-in-up [animation-delay:200ms]">
                <blockquote className="font-serif text-xl md:text-2xl italic text-fatm-charcoal/80 leading-relaxed">
                    “Movies are the memories of our life time, we need to keep them alive.”
                </blockquote>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mt-4">— Martin Scorsese</p>
            </div>

            <footer className="absolute bottom-8 w-full text-center text-xs text-gray-400 font-mono tracking-wider">
                © {new Date().getFullYear()} FATM
            </footer>
        </div>
    );
}
