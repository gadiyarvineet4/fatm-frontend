import React from 'react';
import type { Movie } from '../types';
import { getPoster } from '../utils/posterLoader';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const posterSrc = getPoster([movie.movie_poster, movie.title]);

    return (
        <div className="group relative h-full flex flex-col transition-all duration-300 hover:z-30">
            <div className="relative overflow-hidden bg-gray-100 rounded-lg shadow-sm transition-all duration-500 group-hover:shadow-2xl shrink-0">
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

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Trigger Warning Badge - Always visible if present, positioned nicely */}
                {movie.trigger_warning && (
                    <div className="absolute top-2 right-2 z-10">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/90 text-white font-bold text-[10px] tracking-tighter backdrop-blur-sm shadow-sm" title={movie.trigger_warning}>
                            TW
                        </span>
                    </div>
                )}
            </div>

            <div className="mt-5 px-2 space-y-3 flex flex-col flex-1">
                <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-xl font-serif font-bold leading-tight text-gray-900 group-hover:text-fatm-charcoal transition-colors">
                        {movie.title}
                    </h3>
                </div>

                <div className="flex items-center text-xs tracking-widest text-gray-500 uppercase font-medium">
                    <span className="truncate max-w-[45%]">{movie.director}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="truncate max-w-[45%]">{movie.writer}</span>
                </div>

                <div className="pt-2 pb-1">
                    <p className="text-sm text-gray-600 font-serif italic leading-relaxed line-clamp-3">
                        "{movie.quote}"
                    </p>
                </div>

                {/* Cast - cleaner display */}
                <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-mono leading-relaxed">
                        <span className="uppercase tracking-wider text-gray-300 mr-2">Cast</span>
                        <span className="text-gray-500">{movie.cast}</span>
                    </p>
                </div>

                {/* Trigger Warning Detail - Absolute position to prevent layout shift */}
                {movie.trigger_warning && (
                    <div className="absolute left-0 right-0 -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-rose-50 border border-rose-100 p-3 rounded-md shadow-lg z-20 mx-2 pointer-events-none group-hover:pointer-events-auto">
                        <p className="text-xs text-rose-600 font-medium">
                            <span className="uppercase font-bold text-rose-400 text-[10px] tracking-wider block mb-1">Content Warning</span>
                            {movie.trigger_warning}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

