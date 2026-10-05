import { useState } from 'react';
import { SearchBox } from '../components/SearchBox';
import { ResultsGrid } from '../components/ResultsGrid';
import { LPNote } from '../components/LPNote';
import { ProfileSection } from '../components/ProfileSection';
import { MoodPills } from '../components/MoodPills';
import { LoadingView } from '../components/LoadingView';
import { searchMovies } from '../utils/api';
import { trackSearch, trackRefresh } from '../utils/analytics';
import type { SearchResponse } from '../types';

export function HomePage() {
    const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState('');

    const handleSearch = async (searchQuery: string) => {
        const trimmed = searchQuery.trim();
        if (!trimmed) return;

        trackSearch(trimmed);
        setLoading(true);
        setError(null);
        setSearchResults(null);

        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const data = await searchMovies(trimmed, timezone);
            setSearchResults(data);
        } catch (err) {
            console.error(err);
            setError('Something went wrong retrieving recommendations. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        const targetQuery = (query.trim() || searchResults?.input_text || '').trim();
        if (!targetQuery) return;

        trackRefresh(targetQuery);
        setLoading(true);
        setError(null);

        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const data = await searchMovies(targetQuery, timezone);
            setSearchResults(data);
        } catch (err) {
            console.error(err);
            setError('Something went wrong refreshing recommendations. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectMood = (moodQuery: string) => {
        setQuery(moodQuery);
        handleSearch(moodQuery);
    };

    const handleClear = () => {
        setQuery('');
        setError(null);
    };

    const showLandingNote = !searchResults && !loading;

    return (
        <div className="min-h-screen flex flex-col bg-fatm-cream relative overflow-x-hidden selection:bg-fatm-charcoal selection:text-white">
            {/* Ambient Background decoration */}
            <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none -z-10"></div>

            {/* Profile Section - Top Right */}
            <div className="absolute top-6 right-6 z-50">
                <ProfileSection />
            </div>

            <div className={`transition-all duration-700 ease-in-out flex flex-col ${searchResults || loading ? 'pt-8' : 'justify-center min-h-[75vh]'}`}>

                <header className={`relative z-10 text-center space-y-3 px-4 transition-all duration-700 ${searchResults || loading ? 'mb-6 scale-90' : 'mb-12'}`}>
                    <h1
                        className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tight text-fatm-charcoal cursor-pointer hover:opacity-85 transition-opacity"
                        onClick={() => {
                            setSearchResults(null);
                            setQuery('');
                            setError(null);
                        }}
                    >
                        FOREVER AT THE MOVIES
                    </h1>
                    {!searchResults && !loading && (
                        <p className="text-gray-500 font-light text-base md:text-lg tracking-[0.25em] uppercase animate-fade-in-up [animation-delay:100ms]">
                            Curated Cinema Collection
                        </p>
                    )}
                </header>

                <main className={`relative z-10 w-full max-w-3xl mx-auto px-4 transition-all duration-500`}>
                    <div className="w-full max-w-md mx-auto">
                        <SearchBox 
                            onSearch={handleSearch} 
                            onRefresh={handleRefresh}
                            onClear={handleClear}
                            showRefresh={!!searchResults}
                            isLoading={loading} 
                            value={query} 
                            onChange={setQuery} 
                        />
                    </div>

                    {/* Mood suggestion pills */}
                    {!searchResults && !loading && (
                        <MoodPills onSelectMood={handleSelectMood} disabled={loading} />
                    )}

                    {error && (
                        <div className="mt-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm text-center rounded-lg max-w-md mx-auto animate-fade-in">
                            {error}
                        </div>
                    )}

                    {showLandingNote && <LPNote />}
                </main>

            </div>

            {/* Loading State with Cinematic Quotes and Skeletons */}
            {loading && (
                <div className="flex-1 w-full">
                    <LoadingView query={query || searchResults?.input_text} />
                </div>
            )}

            {/* Results Grid */}
            {!loading && searchResults && (
                <div className="flex-1 w-full bg-gradient-to-t from-fatm-cream via-fatm-cream/90 to-transparent pb-20">
                    <ResultsGrid query={searchResults.input_text} movies={searchResults.recommendations} />
                </div>
            )}

            {showLandingNote && (
                <footer className="w-full text-center text-xs text-gray-400 font-mono tracking-wider pb-8 pt-4">
                    © {new Date().getFullYear()} FATM
                </footer>
            )}
        </div>
    );
}
