/**
 * Google Analytics (GA4) integration utility
 */

declare global {
    interface Window {
        dataLayer: any[];
        gtag?: (...args: any[]) => void;
    }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Initializes Google Analytics by injecting the gtag script tag dynamically
 */
export const initAnalytics = (): void => {
    if (!GA_MEASUREMENT_ID) {
        console.info('[Analytics] VITE_GA_MEASUREMENT_ID is not configured. Analytics tracking disabled.');
        return;
    }

    if (document.getElementById('ga-script')) {
        return;
    }

    // Inject gtag.js script
    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: true,
    });

    console.info(`[Analytics] Google Analytics initialized with ID: ${GA_MEASUREMENT_ID}`);
};

/**
 * Tracks a custom event in Google Analytics
 */
export const trackEvent = (
    eventName: string,
    params?: Record<string, string | number | boolean | undefined>
): void => {
    if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
        window.gtag('event', eventName, params);
    }
};

/**
 * Helper to track film mood queries
 */
export const trackSearch = (searchQuery: string): void => {
    trackEvent('search_query', {
        search_term: searchQuery,
    });
};

/**
 * Helper to track refresh actions
 */
export const trackRefresh = (searchQuery: string): void => {
    trackEvent('refresh_query', {
        search_term: searchQuery,
    });
};

/**
 * Helper to track outbound movie discovery clicks
 */
export const trackMovieClick = (movieTitle: string, destination: 'trailer' | 'letterboxd' | 'google'): void => {
    trackEvent('movie_click', {
        movie_title: movieTitle,
        destination: destination,
    });
};
