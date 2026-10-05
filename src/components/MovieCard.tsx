import React, { useState } from 'react';
import type { Movie } from '../types';
import { trackMovieClick } from '../utils/analytics';

interface MovieCardProps {
    movie: Movie;
    posterUrl: string | null;
    index?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, posterUrl, index = 0 }) => {
    const [imgError, setImgError] = useState(false);

    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(movie.title + ' movie')}`;
    const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' ' + (movie.director || '') + ' official trailer')}`;
    const letterboxdUrl = `https://letterboxd.com/search/${encodeURIComponent(movie.title)}/`;

    return (
        <div 
            className="group relative h-full flex flex-col transition-all duration-300 animate-fade-in-up bg-white/40 hover:bg-white/90 rounded-xl p-3 border border-gray-200/50 hover:border-gray-300 hover:shadow-xl"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* Poster container */}
            <a 
                href={googleSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-gray-100 rounded-lg shadow-sm transition-all duration-500 group-hover:shadow-md shrink-0 block"
            >
                <div className="aspect-[2/3] w-full overflow-hidden bg-gray-200 flex items-center justify-center relative">
                    {posterUrl && !imgError ? (
                        <img
                            src={posterUrl}
                            alt={movie.poster_details || `Poster for ${movie.title}`}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            onError={() => setImgError(true)}
                            loading="lazy"
                        />
                    ) : (
                        <div className="p-6 text-center flex flex-col items-center justify-center h-full bg-gradient-to-b from-gray-100 to-gray-200">
                            <span className="text-gray-600 font-serif font-bold text-lg leading-tight uppercase tracking-wider">{movie.title}</span>
                            <span className="text-[10px] font-mono text-gray-400 mt-2 tracking-widest uppercase">Cinema Archive</span>
                        </div>
                    )}
                </div>

                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Content Warning Badge */}
                {movie.trigger_warning && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                        <span 
                            className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/90 text-white font-bold text-[9px] tracking-tighter backdrop-blur-sm shadow-md transition-transform group-hover:scale-110" 
                            title={movie.trigger_warning}
                        >
                            TW
                        </span>
                    </div>
                )}
            </a>

            {/* Info details */}
            <div className="mt-4 px-1 space-y-3.5 flex flex-col flex-1 justify-between">
                <div className="space-y-3">
                    <a 
                        href={googleSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group/title"
                    >
                        <h3 className="text-xl font-serif font-bold leading-snug text-fatm-charcoal group-hover/title:text-fatm-accent transition-colors">
                            {movie.title}
                        </h3>
                    </a>

                    {movie.quote && (
                        <div>
                            <p className="text-xs text-gray-600 font-serif italic leading-relaxed line-clamp-3 opacity-90">
                                “{movie.quote}”
                            </p>
                        </div>
                    )}

                    <div className="space-y-1 pt-1">
                        {movie.director && (
                            <div className="flex items-center text-[10px] tracking-[0.2em] text-gray-500 uppercase font-semibold">
                                <span className="text-gray-400 mr-2 font-mono text-[9px]">Dir.</span>
                                <span className="truncate text-fatm-charcoal/90">{movie.director}</span>
                            </div>
                        )}

                        {movie.writer && (
                            <div className="flex items-center text-[10px] tracking-[0.2em] text-gray-500 uppercase font-semibold">
                                <span className="text-gray-400 mr-2 font-mono text-[9px]">Writ.</span>
                                <span className="truncate text-fatm-charcoal/90">{movie.writer}</span>
                            </div>
                        )}
                    </div>

                    {/* Trigger Warning expanding drawer */}
                    {movie.trigger_warning && (
                        <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                            <div className="mt-1 bg-rose-50 border border-rose-200/70 p-2.5 rounded-lg shadow-inner">
                                <p className="text-xs text-rose-700 font-medium">
                                    <span className="uppercase font-bold text-rose-500 text-[8px] tracking-[0.2em] block mb-0.5">Content Note</span>
                                    <span className="block leading-relaxed text-[11px] font-sans">{movie.trigger_warning}</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {movie.cast && (
                        <div className="pt-2.5 border-t border-gray-100">
                            <p className="text-xs leading-relaxed">
                                <span className="uppercase tracking-widest text-gray-400 font-semibold text-[9px] block mb-0.5">The Cast</span>
                                <span className="text-gray-700 font-normal line-clamp-2">{movie.cast}</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Quick Discovery Links */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-1 text-[11px] font-mono">
                    <a
                        href={trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackMovieClick(movie.title, 'trailer')}
                        className="px-2.5 py-1 rounded bg-gray-100 hover:bg-fatm-charcoal text-gray-600 hover:text-white transition-colors duration-200 flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold cursor-pointer"
                        title="Watch trailer on YouTube"
                    >
                        <span>▶</span> Trailer
                    </a>

                    <a
                        href={letterboxdUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackMovieClick(movie.title, 'letterboxd')}
                        className="px-2.5 py-1 rounded bg-gray-100 hover:bg-[#20272F] text-gray-600 hover:text-[#00e054] transition-colors duration-200 text-[10px] uppercase tracking-wider font-semibold cursor-pointer"
                        title="View on Letterboxd"
                    >
                        Letterboxd
                    </a>

                    <a
                        href={googleSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackMovieClick(movie.title, 'google')}
                        className="px-2.5 py-1 rounded bg-gray-100 hover:bg-fatm-charcoal text-gray-600 hover:text-white transition-colors duration-200 text-[10px] uppercase tracking-wider font-semibold cursor-pointer"
                        title="Search details on Google"
                    >
                        Info ↗
                    </a>
                </div>
            </div>
        </div>
    );
};

