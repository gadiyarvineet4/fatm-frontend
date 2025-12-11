import React from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="break-inside-avoid mb-6 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100">
                <img
                    src={movie.movie_poster}
                    alt={`Poster for ${movie.title}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                        // Fallback for broken images
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x600?text=No+Poster';
                    }}
                />
                {movie.trigger_warning && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-red-500/80 backdrop-blur-sm text-white text-xs font-bold rounded uppercase tracking-wider">
                        TW
                    </div>
                )}
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h3 className="text-lg font-bold leading-tight text-gray-900">{movie.title}</h3>
                    <p className="text-sm text-gray-500">{movie.director} • {movie.writer}</p>
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 italic border-l-2 border-gray-200 pl-3">
                    "{movie.quote}"
                </p>

                <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Cast</p>
                    <p className="text-xs text-gray-400 line-clamp-2">{movie.cast}</p>
                </div>

                {movie.trigger_warning && (
                    <p className="text-xs text-red-400 mt-2 font-medium">
                        ⚠️ {movie.trigger_warning}
                    </p>
                )}
            </div>
        </div>
    );
};
