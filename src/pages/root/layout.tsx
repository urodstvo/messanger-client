import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import clsx from 'clsx';
import { useLayoutStore } from '@/store/layoutStore';
import { useMediaQuery } from '@/lib/hooks';
import { useCallback, useEffect, useMemo } from 'react';
import { ChatInfoSection } from './components/ChatInfo';

const useBackToRootEffect = () => {
    const navigate = useNavigate();
    const params = useParams();
    const isOnRootPath = useMemo(() => params.chatId === undefined, [params]);

    const { isRightColumnShown, isMiddleColumnShown, toggleMiddleColumn, toggleRightColumn } = useLayoutStore();

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isRightColumnShown) toggleRightColumn();
                if (isMiddleColumnShown) toggleMiddleColumn();
                if (!isOnRootPath) navigate('/');
            }
        },
        [isRightColumnShown, isOnRootPath],
    );

    useEffect(() => {
        document.documentElement.addEventListener('keydown', handleKeyDown);

        return () => {
            document.documentElement.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
};

const useMediaDesktopEffect = () => {
    const { isMiddleColumnShown, isLeftColumnShown, toggleMiddleColumn } = useLayoutStore();

    const isDesktop = useMediaQuery('(min-width: 1024px)');

    useEffect(() => {
        if ((!isDesktop && isMiddleColumnShown && isLeftColumnShown) || (isDesktop && !isMiddleColumnShown))
            toggleMiddleColumn();
    }, [isDesktop, isMiddleColumnShown, isLeftColumnShown]);
};

export const RootLayout = () => {
    const { isLeftColumnShown, isMiddleColumnShown, isRightColumnShown } = useLayoutStore();

    useBackToRootEffect();
    useMediaDesktopEffect();

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
            <main id="middle-column">
                <Outlet />
            </main>
            <article id="right-column">
                <ChatInfoSection />
            </article>
        </div>
    );
};
