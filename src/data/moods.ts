export interface MoodSuggestion {
    id: string;
    label: string;
    query: string;
}

export const MOOD_SUGGESTIONS: MoodSuggestion[] = [
    { id: 'tokyo-rain', label: '90s Tokyo rainy night', query: '90s atmospheric Tokyo rainy night aesthetic film' },
    { id: 'road-trip', label: 'Melancholic road trip', query: 'Melancholic contemplative road trip indie movie' },
    { id: 'cozy-whodunnit', label: 'Cozy autumn whodunnit', query: 'Cozy autumnal murder mystery whodunnit' },
    { id: 'slow-sci-fi', label: 'Existential slow-burn sci-fi', query: 'Existential philosophical slow-burn sci-fi' },
    { id: 'summer-sun', label: 'Mediterranean summer', query: 'Sun-drenched Mediterranean summer romance film' },
    { id: 'coming-of-age', label: 'Nostalgic coming-of-age', query: 'Nostalgic heartwarming coming-of-age cinema' },
    { id: 'mind-game', label: 'Tense cat-and-mouse thriller', query: 'Intense psychological cat-and-mouse thriller' }
];
