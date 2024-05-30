import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

import { useMediaQuery } from '@/lib/hooks';
import { useLayoutStore } from '@/store/layoutStore';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useChatsStore, type State as ChatsState } from '@/store/chatsStore';

export const ChatHeader = () => {
    const { toggleLeftColumn, toggleMiddleColumn, toggleRightColumn } = useLayoutStore((state) => state.actions);

    const isLeftColumnShown = useLayoutStore((state) => state.isLeftColumnShown);
    const isRightColumnShown = useLayoutStore((state) => state.isRightColumnShown);

    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const { chatId } = useParams();

    const selector = useCallback(
        (state: ChatsState) => {
            const foundChat = state.chatsList.find((chat) => chat.id === Number(chatId as string));

            if (!foundChat) return undefined;

            return {
                name: foundChat.name,
                avatar: foundChat.avatar,
            };
        },
        [chatId],
    );

    const chat = useChatsStore(selector);

    return (
        <header className={clsx('w-full sticky top-0 z-10 inset-x-0')}>
            <div
                className={clsx('relative w-full flex gap-1 py-2 h-[62px]', {
                    'bg-white border rounded-lg px-2': isRightColumnShown,
                })}
            >
                {!isLeftColumnShown && !isDesktop && (
                    <Button
                        size="icon"
                        variant="outline"
                        className="bg-white"
                        onClick={() => {
                            toggleLeftColumn();
                            toggleMiddleColumn();
                        }}
                    >
                        <ArrowLeft strokeWidth={1} />
                    </Button>
                )}
                <div
                    className={clsx('flex items-center gap-2 py-2 px-5 bg-white cursor-pointer', {
                        'flex-1': isRightColumnShown,
                        'border rounded-lg absolute left-1/2 top-0 -translate-x-1/2 z-[5]': !isRightColumnShown,
                    })}
                    onClick={toggleRightColumn}
                >
                    <Avatar>
                        <AvatarImage src={chat?.avatar} alt={chat?.name} />
                        <AvatarFallback>Chat</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p>{chat?.name}</p>
                        <span className="text-sm text-gray-500">Online</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
