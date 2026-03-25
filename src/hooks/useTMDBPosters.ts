import { useState, useEffect } from 'react';
import type { Movie } from '../types';

interface TMDBPostersResult {
    posters: Record<string, string | null>;
    isLoading: boolean;
}

export function useTMDBPosters(movies: Movie[]): TMDBPostersResult {
    const [posters, setPosters] = useState<Record<string, string | null>>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const fetchPosters = async () => {
            if (!movies || movies.length === 0) {
                if (isMounted) {
                    setPosters({});
                    setIsLoading(false);
                }
                return;
            }

            if (isMounted) {
                setIsLoading(true);
            }

            const apiKey = import.meta.env.VITE_TMDB_API_KEY;

            if (!apiKey) {
                console.warn('[TMDB Search] VITE_TMDB_API_KEY is not set in environment variables');
                if (isMounted) {
                    setPosters({});
                    setIsLoading(false);
                }
                return;
            }

            const newPosters: Record<string, string | null> = {};

            const fetchPromises = movies.map(async (movie) => {
                const query = encodeURIComponent(movie.title);
                const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.results && data.results.length > 0 && data.results[0].poster_path) {
                        const posterUrl = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
                        newPosters[movie.title] = posterUrl;
                    } else {
                        newPosters[movie.title] = null;
                    }
                } catch (error) {
                    console.error(`[TMDB Search] Error fetching poster for ${movie.title}:`, error);
                    newPosters[movie.title] = null;
                }
            });

            await Promise.all(fetchPromises);

            if (isMounted) {
                setPosters(newPosters);
                setIsLoading(false);
            }
        };

        fetchPosters();

        return () => {
            isMounted = false;
        };
    }, [movies]);

    return { posters, isLoading };
}
