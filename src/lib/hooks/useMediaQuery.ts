import { useState, useEffect, useCallback } from 'react';

var getMatches = function (mediaQuery: string) {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
        return false;
    }
    return window.matchMedia(mediaQuery).matches;
};
export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(getMatches(query));

    const handleChange = useCallback((e: MediaQueryListEvent) => {
        setMatches(e.matches);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
            return;
        }
        const mediaQueryList = window.matchMedia(query);

        mediaQueryList.addEventListener('change', handleChange);

        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, [query, handleChange]);
    return matches;
};
