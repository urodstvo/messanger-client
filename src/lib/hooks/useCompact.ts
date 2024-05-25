import { useMemo } from 'react';

import { useLayoutStore } from '@/store/layoutStore';

import { useMediaQuery } from './useMediaQuery';

export const useCompact = () => {
    const isLaptop = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

    const isLeftColumnShown = useLayoutStore((state) => state.isLeftColumnShown);

    const isCompact = useMemo(() => isLaptop && !isLeftColumnShown, [isLaptop, isLeftColumnShown]);

    return isCompact;
};
