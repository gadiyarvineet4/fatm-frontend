
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const ProfileSection = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (loading) {
        return <div className="animate-pulse w-8 h-8 rounded-full bg-gray-200"></div>;
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setIsDropdownOpen(false);
            // Optionally redirect or stay on page
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (!user) {
        return (
            <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-fatm-charcoal hover:text-fatm-accent transition-colors tracking-wide uppercase font-mono border-b border-transparent hover:border-fatm-accent"
            >
                Sign In
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none group"
            >
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-fatm-charcoal/20 transition-all shadow-sm"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-fatm-charcoal text-white flex items-center justify-center font-serif text-lg">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                )}
            </button>

            {isDropdownOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-2 animate-fade-in-up origin-top-right">
                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Signed in as</p>
                            <p className="text-sm font-medium text-fatm-charcoal truncate">{user.displayName || 'User'}</p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
