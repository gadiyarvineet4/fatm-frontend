import React from 'react';

export const LPNote: React.FC = () => {
    return (
        <div className="mt-16 mb-16 max-w-3xl mx-auto px-6 text-center animate-fade-in-up [animation-delay:300ms]">
            <div className="relative border-t border-b border-fatm-charcoal/10 py-12 space-y-10">

                {/* Quote Section Removed */}
                <div className="space-y-4">
                    <h2 className="text-sm font-sans tracking-widest uppercase text-fatm-accent opacity-80">
                        How This Works
                    </h2>
                    {/* Quote moved to EntryPage */}
                </div>

                {/* Our Belief */}
                <div className="max-w-xl mx-auto space-y-4">
                    <h3 className="font-serif text-xl font-bold text-fatm-charcoal">Our Belief</h3>
                    <p className="text-fatm-charcoal/80 font-light leading-relaxed">
                        Cinema can change your life—but the process of discovery has become a chore. We all have that one friend who just knows the right movie for the right moment. Algorithms make finding that gem over-complicated and tedious.
                    </p>
                    <p className="text-fatm-charcoal/80 font-light leading-relaxed">
                        At <span className="font-serif italic font-semibold">Forever at the Movies</span>, we bring the joy back to movie discovery. We don't use cold algorithms. Instead, we offer handpicked suggestions—curated by real movie lovers—so it feels as easy as asking a friend for a good suggestion.
                    </p>
                </div>

                {/* Divider */}
                <div className="w-16 h-px bg-fatm-charcoal/20 mx-auto"></div>

                {/* Upcoming */}
                <div className="space-y-4">
                    <h3 className="font-serif text-lg font-bold text-fatm-charcoal mb-2">Upcoming Features</h3>
                    <ul className="text-sm text-fatm-charcoal/70 space-y-2 font-light list-none">
                        <li>1. Refined suggestions & technical improvements.</li>
                        <li>2. Streaming platform availability based on location.</li>
                        <li>3. User accounts to save movies and more.</li>
                        <li>4. High quality posters displayed along with the titles.</li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="pt-8 border-t border-dashed border-fatm-charcoal/10">
                    <p className="text-xs text-gray-400 font-mono">
                        Suggestions? Mail at <a href="mailto:gadiyarvineet4@gmail.com" className="underline hover:text-fatm-accent transition-colors">gadiyarvineet4@gmail.com</a>
                    </p>
                </div>

            </div>
        </div>
    );
};
