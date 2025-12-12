/**
 * Utility to load poster images dynamically from the ../assets/posters directory.
 */

// Import all images from the posters directory
const posters = import.meta.glob<{ default: string }>('../assets/posters/*.(png|jpg|jpeg|svg|webp)', {
    eager: true,
});

/**
 * matches the filename to the imported image
 * @param filename - The filename of the poster (e.g., "inception.jpg")
 * @returns The resolved URL of the image, or a fallback if not found
 */
export const getPoster = (filenameOrCandidates: string | string[]): string => {
    const candidates = Array.isArray(filenameOrCandidates) ? filenameOrCandidates : [filenameOrCandidates];

    // Filter out empty candidates
    const validCandidates = candidates.filter(c => c && c.trim() !== '');

    if (validCandidates.length === 0) {
        return 'https://placehold.co/400x600?text=No+Poster';
    }

    // Try finding a match for each candidate
    for (const filename of validCandidates) {
        // Normalize filename to avoid path issues
        // Sanitize filename for lookup (e.g. remove special chars that might not be in filename)
        // actually, let's keep it simple first: exact or partial match.

        // 1. Try exact match assuming the filename passed might just be the name
        let match = Object.keys(posters).find((key) => key.endsWith(`/${filename}`));

        // 2. If no exact match, try matching the filename as the validation name without extension
        if (!match) {
            match = Object.keys(posters).find((key) => {
                // key is like "../assets/posters/aftersun_2022.jpg"
                // we want to see if it contains "/aftersun_2022."
                return key.includes(`/${filename}.`);
            });
        }

        // 3. Try sanitized version (e.g. if title is "Aftersun: The Movie", try "aftersun the movie" or "aftersun")
        if (!match) {
            const sanitized = filename.replace(/[^a-zA-Z0-9]/g, '_'); // Replace non-alphanumeric with underscore
            if (sanitized !== filename) {
                match = Object.keys(posters).find((key) => key.includes(`/${sanitized}.`));
            }
        }

        if (match) {
            return posters[match].default;
        }

        // If candidate is a URL, return it
        if (filename.startsWith('http')) {
            return filename;
        }
    }

    // Fallback to a placehold.co image with the first candidate's text
    const fallbackText = validCandidates[0] || 'No Poster';
    return `https://placehold.co/400x600?text=${encodeURIComponent(fallbackText)}`;
};
