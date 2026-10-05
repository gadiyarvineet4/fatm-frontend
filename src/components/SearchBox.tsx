import React from 'react';

interface SearchBoxProps {
    onSearch: (query: string) => void;
    onRefresh?: () => void;
    showRefresh?: boolean;
    isLoading?: boolean;
    value: string;
    onChange: (value: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ 
    onSearch, 
    onRefresh, 
    showRefresh = false, 
    isLoading, 
    value, 
    onChange 
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim()) {
            onSearch(value);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto group">
            <div className={`relative flex items-center w-full h-14 rounded-full bg-white shadow-sm border transition-all duration-300 ${isLoading ? 'border-gray-400 shadow-md' : 'border-gray-200 group-hover:shadow-md'} focus-within:shadow-lg focus-within:border-fatm-charcoal`}>
                <div className="grid place-items-center h-full w-14 text-gray-400 shrink-0">
                    {isLoading ? (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-fatm-charcoal animate-spin"></div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </div>
                <input
                    className={`peer h-full w-full outline-none text-base text-fatm-charcoal bg-transparent placeholder-gray-400 font-light font-sans ${showRefresh && onRefresh ? 'pr-2' : 'pr-6'}`}
                    type="text"
                    id="search"
                    placeholder="In the mood for..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />
                {showRefresh && onRefresh && (
                    <div className="pr-3 flex items-center shrink-0">
                        <button
                            type="button"
                            onClick={onRefresh}
                            disabled={isLoading}
                            title="Refresh recommendations"
                            aria-label="Refresh recommendations"
                            className="p-2 text-gray-400 hover:text-fatm-charcoal rounded-full hover:bg-gray-100 transition-all duration-300 disabled:opacity-40 group/refresh cursor-pointer"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`w-4 h-4 transition-transform duration-500 group-hover/refresh:rotate-180 ${isLoading ? 'animate-spin text-fatm-charcoal' : ''}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
