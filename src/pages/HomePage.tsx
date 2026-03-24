
import { useState } from 'react';
import { SearchBox } from '../components/SearchBox';
import { ResultsGrid } from '../components/ResultsGrid';
import { LPNote } from '../components/LPNote';
import { ProfileSection } from '../components/ProfileSection';
import { searchMovies } from '../utils/api';
import type { SearchResponse } from '../types';

export function HomePage() {
    const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [refreshCount, setRefreshCount] = useState(0);

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);
        setSearchResults(null);
        setRefreshCount(0); // Reset count on new search

        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const data = await searchMovies(searchQuery, timezone);
            setSearchResults(data);
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        if (refreshCount >= 2 || !query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const data = await searchMovies(query, timezone);
            setSearchResults(data);
            setRefreshCount(prev => prev + 1);
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-fatm-cream relative overflow-x-hidden">
            {/* Background decoration (optional/subtle) */}
            <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none -z-10"></div>

            {/* Profile Section - Top Right */}
            <div className="absolute top-6 right-6 z-50">
                <ProfileSection />
            </div>

            <div className={`transition-all duration-700 ease-in-out flex flex-col ${searchResults ? 'pt-8' : 'justify-center min-h-[80vh]'}`}>

                <header className={`relative z-10 text-center space-y-4 px-4 transition-all duration-700 ${searchResults ? 'mb-8 scale-90' : 'mb-16'}`}>
                    <h1
                        className="text-4xl md:text-7xl font-serif font-bold tracking-tight text-fatm-charcoal cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                            setSearchResults(null);
                            setQuery('');
                        }}
                    >
                        FOREVER AT THE MOVIES
                    </h1>
                    {!searchResults && (
                        <p className="text-gray-600 font-light text-xl tracking-widest uppercase animate-fade-in-up [animation-delay:100ms]">
                            Curated Cinema Collection
                        </p>
                    )}
                    <p className="text-xs text-gray-400 font-mono italic mt-2 opacity-60">
                        (work in progress)
                    </p>
                </header>

                <main className={`relative z-10 w-full max-w-2xl mx-auto px-4 transition-all duration-500 ${searchResults ? '' : 'animate-fade-in-up [animation-delay:200ms]'}`}>
                    <SearchBox onSearch={handleSearch} isLoading={loading} value={query} onChange={setQuery} />
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                    {!searchResults && <LPNote />}
                </main>

            </div>

            {searchResults && (
                <div className="flex-1 w-full bg-gradient-to-t from-fatm-cream via-fatm-cream/90 to-transparent pb-20">
                    <ResultsGrid query={searchResults.input_text} movies={searchResults.recommendations} />
                    
                    <div className="max-w-2xl mx-auto px-4 mt-8 mb-12 text-center">
                        {refreshCount < 2 ? (
                            <button
                                onClick={handleRefresh}
                                disabled={loading}
                                className="group flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-white border border-gray-200 text-fatm-charcoal rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50"
                            >
                                <svg 
                                    className={`w-4 h-4 text-gray-400 group-hover:text-fatm-charcoal transition-colors ${loading ? 'animate-spin' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span className="text-sm font-medium tracking-wide uppercase font-mono">
                                    {loading ? 'Refreshing...' : 'Give me more'}
                                </span>
                            </button>
                        ) : (
                            <p className="text-sm text-gray-500 font-serif italic animate-fade-in">
                                We've shown you 12 films. Try watching the first 10 minutes of any of these.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {!searchResults && (
                <footer className="absolute bottom-8 w-full text-center text-xs text-gray-400 font-mono tracking-wider">
                    © {new Date().getFullYear()} FATM
                </footer>
            )}
        </div>
    );
}
