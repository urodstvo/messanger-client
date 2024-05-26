import { useState, useEffect } from 'react';

const getMatches = function (mediaQuery: string) {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
        return false;
    }
    return window.matchMedia(mediaQuery).matches;
};

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(getMatches(query));

    useEffect(() => {
        const handleChange = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
            return;
        }
        const mediaQueryList = window.matchMedia(query);

        mediaQueryList.addEventListener('change', handleChange);

        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, []);

    return matches;
};
