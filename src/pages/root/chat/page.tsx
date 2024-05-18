import { useMediaQuery, useTitle } from '@/lib/hooks';
import { useLayoutStore } from '@/store/layoutStore';
import { useParams } from 'react-router-dom';

export const ChatPage = () => {
    const params = useParams();
    useTitle(`Chat ${params.chatId} | Messanger`);

    const layoutStore = useLayoutStore();

    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const isLaptop = useMediaQuery('(min-width: 640px) and (max-width:768px)');

    const handleClick = () => {
        layoutStore.toggleMiddleColumn();
        layoutStore.toggleLeftColumn();
    };

    const openRightColumn = () => {
        layoutStore.toggleRightColumn();
    };

    return (
        <div
            className="flex flex-col gap-2 w-full"
            onClick={() => {
                if (isLaptop) {
                    if (layoutStore.isLeftColumnShown && !layoutStore.isMiddleColumnShown) {
                        layoutStore.toggleMiddleColumn();
                        layoutStore.toggleLeftColumn();
                    }

                    if (layoutStore.isRightColumnShown) layoutStore.toggleRightColumn();
                }
            }}
        >
            <div>
                {!layoutStore.isLeftColumnShown && !isDesktop && (
                    <button className="px-5 py-2 bg-blue-400 rounded" onClick={handleClick}>
                        left
                    </button>
                )}
                <button className="px-5 py-2 bg-blue-400 rounded" onClick={openRightColumn}>
                    right
                </button>
            </div>
            <div className="text-end">chat message</div>
        </div>
    );
};
