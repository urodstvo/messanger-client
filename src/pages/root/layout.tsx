import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import { useLayoutStore } from '@/store/layoutStore';
import { useMediaQuery } from '@/lib/hooks';

import { Sidebar } from './components/Sidebar';
import { ChatInfoSection } from './components/ChatInfo';

const useBackToRootEffect = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { isRightColumnShown, isMiddleColumnShown } = useLayoutStore(
        useShallow((state) => ({
            isRightColumnShown: state.isRightColumnShown,
            isMiddleColumnShown: state.isMiddleColumnShown,
        })),
    );
    const { toggleMiddleColumn, toggleRightColumn } = useLayoutStore((state) => state.actions);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isRightColumnShown) toggleRightColumn();
                if (isMiddleColumnShown) toggleMiddleColumn();
                if (params.chatId !== undefined) navigate('/');
            }
        },
        [isRightColumnShown, params],
    );

    useEffect(() => {
        document.documentElement.addEventListener('keydown', handleKeyDown);

        return () => {
            document.documentElement.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
};

const useMediaDesktopEffect = () => {
    const { isMiddleColumnShown, isLeftColumnShown } = useLayoutStore(
        useShallow((state) => ({
            isMiddleColumnShown: state.isMiddleColumnShown,
            isLeftColumnShown: state.isLeftColumnShown,
        })),
    );
    const { toggleMiddleColumn } = useLayoutStore((state) => state.actions);

    const isDesktop = useMediaQuery('(min-width: 1024px)');

    useEffect(() => {
        if ((!isDesktop && isMiddleColumnShown && isLeftColumnShown) || (isDesktop && !isMiddleColumnShown))
            toggleMiddleColumn();
    }, [isDesktop, isMiddleColumnShown, isLeftColumnShown]);
};

export const RootLayout = () => {
    const { isLeftColumnShown, isMiddleColumnShown, isRightColumnShown } = useLayoutStore(
        useShallow((state) => ({
            isLeftColumnShown: state.isLeftColumnShown,
            isMiddleColumnShown: state.isMiddleColumnShown,
            isRightColumnShown: state.isRightColumnShown,
        })),
    );
    const { toggleLeftColumn, toggleMiddleColumn, toggleRightColumn } = useLayoutStore((state) => state.actions);

    useBackToRootEffect();
    useMediaDesktopEffect();

    const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1279px)');

    const onSelectMiddleColumn = useCallback(() => {
        if (isRightColumnShown && !isLeftColumnShown) toggleRightColumn();
        else {
            toggleMiddleColumn();
            toggleLeftColumn();
        }
    }, [isRightColumnShown, isLeftColumnShown]);

    return (
        <div
            className={clsx({
                'left-column-shown': isLeftColumnShown,
                'chat-shown': isMiddleColumnShown,
                'right-column-shown': isRightColumnShown,
            })}
            id="columns"
        >
            <aside id="left-column">
                <Sidebar />
            </aside>
            <main id="middle-column" className="relative">
                {isTablet && (isLeftColumnShown || isRightColumnShown) && (
                    <div className="absolute inset-0 z-10" onClick={onSelectMiddleColumn} />
                )}
                <Outlet />
            </main>
            <article id="right-column">
                <ChatInfoSection />
            </article>
        </div>
    );
};
