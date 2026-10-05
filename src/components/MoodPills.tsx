import React from 'react';
import { MOOD_SUGGESTIONS } from '../data/moods';

interface MoodPillsProps {
    onSelectMood: (query: string) => void;
    disabled?: boolean;
}

export const MoodPills: React.FC<MoodPillsProps> = ({ onSelectMood, disabled }) => {
    return (
        <div className="w-full max-w-2xl mx-auto mt-6 text-center animate-fade-in-up [animation-delay:250ms]">
            <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-8 bg-gray-300/60" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-mono">
                    Explore curated moods
                </p>
                <div className="h-px w-8 bg-gray-300/60" />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2">
                {MOOD_SUGGESTIONS.map((mood) => (
                    <button
                        key={mood.id}
                        type="button"
                        onClick={() => onSelectMood(mood.label)}
                        disabled={disabled}
                        className="px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-fatm-charcoal text-xs font-sans font-medium border border-gray-200 hover:border-gray-400/70 hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {mood.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
