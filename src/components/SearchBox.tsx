import React, { useRef, useEffect } from 'react';

interface SearchBoxProps {
    onSearch: (query: string) => void;
    onRefresh?: () => void;
    onClear?: () => void;
    showRefresh?: boolean;
    isLoading?: boolean;
    value: string;
    onChange: (value: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ 
    onSearch, 
    onRefresh, 
    onClear,
    showRefresh = false, 
    isLoading, 
    value, 
    onChange 
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDownGlobal = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            } else if (e.key === '/' && document.activeElement !== inputRef.current && !(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement)) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDownGlobal);
        return () => window.removeEventListener('keydown', handleKeyDownGlobal);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim()) {
            onSearch(value);
        } else if (e.key === 'Escape') {
            if (value) {
                onChange('');
                onClear?.();
            } else {
                inputRef.current?.blur();
            }
        }
    };

    const handleClear = () => {
        onChange('');
        onClear?.();
        inputRef.current?.focus();
    };

    return (
        <div className="w-full max-w-md mx-auto group">
            <div className={`relative flex items-center w-full h-14 rounded-full bg-white shadow-sm border transition-all duration-300 ${isLoading ? 'border-gray-400 shadow-md ring-2 ring-gray-200' : 'border-gray-200 group-hover:shadow-md'} focus-within:shadow-lg focus-within:border-fatm-charcoal focus-within:ring-2 focus-within:ring-fatm-charcoal/10`}>
                <div className="grid place-items-center h-full w-14 text-gray-400 shrink-0">
                    {isLoading ? (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-fatm-charcoal animate-spin"></div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors group-focus-within:text-fatm-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </div>
                
                <input
                    ref={inputRef}
                    className="peer h-full w-full outline-none text-base text-fatm-charcoal bg-transparent placeholder-gray-400 font-light font-sans pr-2"
                    type="text"
                    id="search"
                    placeholder="In the mood for..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />

                <div className="pr-3 flex items-center gap-1 shrink-0">
                    {/* Clear button */}
                    {value.trim().length > 0 && !isLoading && (
                        <button
                            type="button"
                            onClick={handleClear}
                            title="Clear search"
                            aria-label="Clear search"
                            className="p-1.5 text-gray-400 hover:text-fatm-charcoal rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}

                    {/* Refresh / Retry button when results are displayed */}
                    {showRefresh && onRefresh && (
                        <button
                            type="button"
                            onClick={onRefresh}
                            disabled={isLoading}
                            title="Refresh recommendations"
                            aria-label="Refresh recommendations"
                            className="p-1.5 text-gray-400 hover:text-fatm-charcoal rounded-full hover:bg-gray-100 transition-all duration-300 disabled:opacity-40 group/refresh cursor-pointer"
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
                    )}

                    {/* Keyboard shortcut hint when empty */}
                    {!value && (
                        <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium text-gray-400 bg-gray-100/80 rounded border border-gray-200/60 pointer-events-none select-none">
                            /
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
