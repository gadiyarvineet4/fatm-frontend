import React from 'react';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';
import { useTMDBPosters } from '../hooks/useTMDBPosters';

interface ResultsGridProps {
    query: string;
    movies: Movie[];
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ query, movies }) => {
    const { posters } = useTMDBPosters(movies);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 pt-6 pb-28">
            <div className="mb-10 text-center animate-fade-in">
                <p className="text-[11px] text-gray-400 uppercase tracking-[0.25em] font-mono mb-2">Curated for</p>
                <h2 className="text-2xl md:text-3xl font-serif italic text-fatm-charcoal">“{query}”</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie, index) => (
                    <MovieCard 
                        key={`${movie.title}-${index}`} 
                        movie={movie} 
                        posterUrl={posters[movie.title] ?? null}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};
