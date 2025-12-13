import { useState } from 'react';
import { SearchBox } from './components/SearchBox';
import { ResultsGrid } from './components/ResultsGrid';
import { LPNote } from './components/LPNote';
import { searchMovies } from './utils/api';
import type { SearchResponse } from './types';

function App() {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearchResults(null);

    try {
      // In a real app, query would be passed to backend which performs the search
      // For now we trust the backend returns the structure we defined
      const data = await searchMovies(query);
      setSearchResults(data);
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
        <div className="flex-1 w-full bg-gradient-to-t from-fatm-cream via-fatm-cream/90 to-transparent">
          <ResultsGrid query={searchResults.input_text} movies={searchResults.recommendations} />
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

export default App;
