import React from 'react';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

interface ResultsGridProps {
    query: string;
    movies: Movie[];
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ query, movies }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
            <div className="mb-12 text-center">
                <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">You asked for</p>
                <h2 className="text-2xl md:text-3xl font-serif italic text-gray-800">"{query}"</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie, index) => (
                    <MovieCard key={`${movie.title}-${index}`} movie={movie} />
                ))}
            </div>
        </div>
    );
};
