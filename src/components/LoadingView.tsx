import React, { useState, useEffect } from 'react';
import { CINEMA_QUOTES } from '../data/quotes';

interface LoadingViewProps {
    query?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ query }) => {
    const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * CINEMA_QUOTES.length));
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setQuoteIndex((prev) => (prev + 1) % CINEMA_QUOTES.length);
                setFade(true);
            }, 300);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentQuote = CINEMA_QUOTES[quoteIndex];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 pt-6 pb-28 animate-fade-in">
            {/* Header with Query & Rotating Cinema Quote */}
            <div className="mb-12 text-center max-w-2xl mx-auto px-4">
                {query && (
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-3">
                        Curating for "{query}"
                    </p>
                )}

                <div className="min-h-[90px] flex flex-col items-center justify-center">
                    <blockquote
                        className={`font-serif italic text-lg md:text-xl text-fatm-charcoal transition-opacity duration-300 ${
                            fade ? 'opacity-90' : 'opacity-0'
                        }`}
                    >
                        “{currentQuote.text}”
                    </blockquote>
                    <cite
                        className={`block text-xs uppercase tracking-widest font-mono text-gray-500 mt-2 transition-opacity duration-300 ${
                            fade ? 'opacity-80' : 'opacity-0'
                        }`}
                    >
                        — {currentQuote.author}
                    </cite>
                </div>

                {/* Subtle loading pulse bar */}
                <div className="w-24 h-0.5 bg-gray-200 rounded-full mx-auto mt-6 overflow-hidden">
                    <div className="w-full h-full bg-fatm-charcoal rounded-full animate-[shimmer_1.5s_infinite_linear] origin-left-right"></div>
                </div>
            </div>

            {/* Skeleton Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div 
                        key={i} 
                        className="flex flex-col animate-pulse"
                        style={{ animationDelay: `${i * 150}ms` }}
                    >
                        {/* Poster skeleton with 2:3 ratio */}
                        <div className="relative aspect-[2/3] w-full rounded-lg bg-gray-200/80 overflow-hidden shadow-sm">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg 
                                    className="w-10 h-10 text-gray-300 opacity-60" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                </svg>
                            </div>
                        </div>

                        {/* Text skeleton lines */}
                        <div className="mt-5 px-2 space-y-3">
                            <div className="h-5 bg-gray-200/90 rounded-md w-3/4"></div>
                            <div className="h-3.5 bg-gray-200/60 rounded-md w-full"></div>
                            <div className="h-3.5 bg-gray-200/50 rounded-md w-5/6"></div>
                            <div className="pt-2 flex gap-2">
                                <div className="h-3 bg-gray-200/70 rounded-md w-1/3"></div>
                                <div className="h-3 bg-gray-200/70 rounded-md w-1/3"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
