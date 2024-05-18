import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import clsx from 'clsx';
import { useLayoutStore } from '@/store/layoutStore';
import { useMediaQuery } from '@/lib/hooks';
import { useEffect } from 'react';

export const RootLayout = () => {
    const navigate = useNavigate();

    const layoutStore = useLayoutStore();

    const isLarge = useMediaQuery('(min-width: 1024px)');

    useEffect(() => {
        if (!isLarge && layoutStore.isMiddleColumnShown && layoutStore.isLeftColumnShown)
            layoutStore.toggleMiddleColumn();
        if (isLarge && !layoutStore.isMiddleColumnShown) layoutStore.toggleMiddleColumn();
    }, [isLarge]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                navigate('/');
            }
        };

        document.documentElement.addEventListener('keydown', handleKeyDown);

        return () => {
            document.documentElement.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            className={clsx({
                'left-column-shown': layoutStore.isLeftColumnShown,
                'chat-shown': layoutStore.isMiddleColumnShown,
                'right-column-shown': layoutStore.isRightColumnShown,
            })}
            id="columns"
        >
            <aside id="left-column">
                <Sidebar />
            </aside>
            <main id="middle-column">
                <Outlet />
            </main>
            <div id="right-column">
                <section>
                    <button
                        className="px-5 py-2 bg-blue-400 rounded"
                        onClick={() => {
                            layoutStore.toggleRightColumn();
                        }}
                    >
                        back
                    </button>
                </section>
            </div>
        </div>
    );
};
