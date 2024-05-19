import { useMediaQuery, useTitle } from '@/lib/hooks';
import { useLayoutStore } from '@/store/layoutStore';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Textarea } from '@/ui/textarea';
import { FileAttachmentButton } from './components/FileAttachmentButton';
import { SendMessageButton } from './components/SendMessageButton';

export const ChatPage = () => {
    const params = useParams();
    useTitle(`Chat ${params.chatId} | Messanger`);

    const layoutStore = useLayoutStore();

    const isLaptop = useMediaQuery('(min-width: 640px) and (max-width:768px)');
    const isCompact = isLaptop && !layoutStore.isLeftColumnShown;

    const handleClick = useCallback(() => {
        layoutStore.toggleMiddleColumn();
        layoutStore.toggleLeftColumn();
    }, []);

    const openRightColumn = useCallback(() => {
        layoutStore.toggleRightColumn();
    }, []);

    return (
        <div
            className="flex flex-col gap-1 w-full"
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
            <div className=""></div>
            <div className="relative flex-1">
                <section></section>
                <section></section>
                <section></section>
                <div className="flex justify-center absolute inset-x-0 bottom-0 ">
                    <div className="flex p-2 border rounded w-[400px] gap-1 bg-white shadow-lg">
                        <FileAttachmentButton />
                        <Textarea
                            rows={1}
                            autoFocus
                            placeholder="Type Message"
                            className="rounded flex-1 resize-none p-2 min-h-[44px] max-h-[300px] overflow-y-auto no-scrollbar"
                            onInput={(e) => {
                                const target = e.currentTarget;
                                target.style.height = 'inherit';
                                target.style.height = target.scrollHeight + 'px';
                            }}
                        />
                        <SendMessageButton />
                    </div>
                </div>
            </div>
        </div>
    );
};
