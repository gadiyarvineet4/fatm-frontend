export interface Movie {
    title: string;
    director: string;
    writer: string;
    cast: string;
    quote: string;
    trigger_warning: string;
    poster_details: string;
    streaming?: string[];
}

export interface SearchResponse {
    input_text: string;
    recommendations: Movie[];
}
