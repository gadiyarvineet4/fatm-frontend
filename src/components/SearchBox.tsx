import React from 'react';

interface SearchBoxProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
    value: string;
    onChange: (value: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, isLoading, value, onChange }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim()) {
            onSearch(value);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto group">
            <div className={`relative flex items-center w-full h-14 rounded-full bg-white shadow-sm border transition-all duration-300 ${isLoading ? 'border-gray-400 shadow-md' : 'border-gray-200 group-hover:shadow-md'} focus-within:shadow-lg focus-within:border-fatm-charcoal`}>
                <div className="grid place-items-center h-full w-14 text-gray-400">
                    {isLoading ? (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-fatm-charcoal animate-spin"></div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </div>
                <input
                    className="peer h-full w-full outline-none text-base text-fatm-charcoal pr-6 bg-transparent placeholder-gray-400 font-light font-sans"
                    type="text"
                    id="search"
                    placeholder="In the mood for..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};
