export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const searchMovies = async (query: string) => {
    try {
        console.log(`[Search] Request started for query: "${query}" at ${new Date().toISOString()}`);
        const startTime = performance.now();

        const response = await fetch(`${API_BASE_URL}/getMovies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input_text: query }),
        });

        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);
        console.log(`[Search] Request completed in ${duration}ms`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};
