export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const searchMovies = async (query: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/getMovies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input_text: query }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};
