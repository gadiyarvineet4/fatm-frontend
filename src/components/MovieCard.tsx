import React, { useState } from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
    movie: Movie;
    posterUrl: string | null;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, posterUrl }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="group relative h-full flex flex-col transition-all duration-300 hover:z-30">
            <div className="relative overflow-hidden bg-gray-100 rounded-lg shadow-sm transition-all duration-500 group-hover:shadow-2xl shrink-0">
                <div className="aspect-[2/3] w-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {posterUrl && !imgError ? (
                        <img
                            src={posterUrl}
                            alt={movie.poster_details || `Poster for ${movie.title}`}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="p-4 text-center">
                            <span className="text-gray-400 font-serif font-bold text-lg leading-tight uppercase tracking-wider">{movie.title}</span>
                            <span className="block text-xs text-gray-400 mt-2">No Poster Available</span>
                        </div>
                    )}
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

            <div className="mt-5 px-2 space-y-4 flex flex-col flex-1">
                <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-xl font-serif font-bold leading-tight text-gray-900 group-hover:text-fatm-charcoal transition-colors">
                        {movie.title}
                    </h3>
                </div>

                <div className="pt-1">
                    <p className="text-[sm] text-gray-500 font-serif italic leading-relaxed line-clamp-2 opacity-80">
                        "{movie.quote}"
                    </p>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center text-[10px] tracking-[0.2em] text-gray-500 uppercase font-semibold">
                        <span className="text-gray-400 mr-2 font-mono text-[9px]">Dir.</span>
                        <span className="truncate">{movie.director}</span>
                    </div>

                    <div className="flex items-center text-[10px] tracking-[0.2em] text-gray-500 uppercase font-semibold">
                        <span className="text-gray-400 mr-2 font-mono text-[9px]">Writ.</span>
                        <span className="truncate">{movie.writer}</span>
                    </div>
                </div>

                {/* Trigger Warning - Inline and only shows on hover, pushes content down */}
                {movie.trigger_warning && (
                    <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                        <div className="mt-2 bg-rose-50/50 border border-rose-100 p-3 rounded-lg">
                            <p className="text-xs text-rose-600 font-medium">
                                <span className="uppercase font-extrabold text-rose-400 text-[8px] tracking-[0.2em] block mb-1">Content Warning</span>
                                <span className="block leading-relaxed text-[11px]">{movie.trigger_warning}</span>
                            </p>
                        </div>
                    </div>
                )}

                <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs leading-relaxed">
                        <span className="uppercase tracking-widest text-indigo-400 font-bold text-[9px] block mb-1">The Cast</span>
                        <span className="text-slate-600 font-medium">{movie.cast}</span>
                    </p>
                </div>

                <div className="pt-3 space-y-2 border-t border-gray-100">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-amber-500 font-bold">Watch on</p>
                    <div className="flex flex-wrap gap-1.5">
                        {movie.streaming && movie.streaming.length > 0 ? (
                            movie.streaming.map((platform) => (
                                <span 
                                    key={platform}
                                    className="px-2.5 py-1 bg-amber-50/50 text-amber-700 text-[10px] font-bold rounded-md border border-amber-100 hover:bg-amber-100 hover:border-amber-200 transition-all duration-200 shadow-sm"
                                >
                                    {platform}
                                </span>
                            ))
                        ) : (
                            <span className="text-[10px] text-gray-400 italic font-serif">Check local availability</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

