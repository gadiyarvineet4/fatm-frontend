import React from 'react';
import type { Movie } from '../types';
import { getPoster } from '../utils/posterLoader';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const posterSrc = getPoster([movie.movie_poster, movie.title]);

    return (
        <div className="break-inside-avoid mb-8 group">
            <div className="relative overflow-hidden bg-gray-100 rounded-sm shadow-md transition-all duration-500 group-hover:shadow-xl">
                <div className="aspect-[2/3] w-full overflow-hidden">
                    <img
                        src={posterSrc}
                        alt={`Poster for ${movie.title}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            if ((e.target as HTMLImageElement).src !== 'https://placehold.co/400x600?text=No+Poster') {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/400x600?text=No+Poster';
                            }
                        }}
                    />
                </div>

                {/* Overlay gradient for text readability on poster if needed, or stick to below */}
            </div>

            <div className="mt-4 px-1 space-y-2">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xl font-serif font-medium leading-snug text-fatm-black group-hover:text-gray-600 transition-colors">
                        {movie.title}
                    </h3>
                    {movie.trigger_warning && (
                        <span className="shrink-0 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold text-rose-500 border border-rose-200 rounded-full bg-rose-50">
                            TW
                        </span>
                    )}
                </div>

                <div className="flex items-center text-xs tracking-wide text-gray-500 uppercase font-medium">
                    <span>{movie.director}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span>{movie.writer}</span>
                </div>

                <div className="pt-2">
                    <p className="text-sm text-gray-600 font-serif italic leading-relaxed text-balance">
                        "{movie.quote}"
                    </p>
                </div>

                <div className="pt-3 flex flex-wrap gap-x-1 text-xs text-gray-400">
                    <span className="uppercase tracking-wider text-gray-300">Cast:</span>
                    <span className="line-clamp-1">{movie.cast}</span>
                </div>

                {movie.trigger_warning && (
                    <p className="text-xs text-rose-400 mt-1 font-medium bg-rose-50/50 p-2 rounded hidden group-hover:block transition-all duration-300">
                        ⚠️ {movie.trigger_warning}
                    </p>
                )}
            </div>
        </div>
    );
};

