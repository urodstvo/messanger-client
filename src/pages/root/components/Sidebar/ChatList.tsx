import { MouseEvent, memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { useLayoutStore } from '@/store/layoutStore';
import { useChatsStore, State as ChatsState } from '@/store/chatsStore';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

import { useMediaQuery, useCompact } from '@/lib/hooks';

type Chat = {
    id: number;
    name: string;
    avatar: string;
    lastMessageText: string;
    lastMessageAuthor: number;
};

export const ChatListItem = memo((props: Chat) => {
    return (
        <div className="flex gap-2 items-center whitespace-nowrap justify-center">
            <Avatar>
                <AvatarImage src={props.avatar} alt={props.name} />
                <AvatarFallback>
                    {props.name
                        .split(' ')
                        .map((word) => word.charAt(0))
                        .join('')}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0 flex-1 group-[.is-compact]:hidden">
                <div className="font-bold">{props.name}</div>
                <p className="flex-1">{props.lastMessageText}</p>
            </div>
        </div>
    );
});

const chatsSelector = (state: ChatsState) =>
    state.chatsList.map((chat) => {
        const lastMessage = chat.history[chat.history.length - 1];

        return {
            id: chat.id,
            name: chat.name,
            avatar: chat.avatar,
            lastMessageText: lastMessage?.text || '',
            lastMessageAuthor: lastMessage?.author.id || -1,
        } as Chat;
    });

export const ChatList = () => {
    const isLaptop = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
    const isCompact = useCompact();

    const chats = useChatsStore(chatsSelector);
    const { toggleLeftColumn, toggleMiddleColumn } = useLayoutStore((state) => state.actions);

    const handleClick = useCallback(
        (e: MouseEvent<HTMLAnchorElement>) => {
            const current = e.currentTarget.getAttribute('aria-current');
            if (current === 'page') e.preventDefault();

            if (isLaptop && !isCompact) {
                toggleMiddleColumn();
                toggleLeftColumn();
            }
        },
        [isCompact, isLaptop],
    );

    return (
        <div
            className={clsx('flex flex-col w-full h-full group', {
                'is-compact': isCompact,
            })}
        >
            {chats.map((chat: Chat) => (
                <NavLink
                    key={`chat-${chat.id}`}
                    to={`/chat/${chat.id}`}
                    className={clsx(
                        'rounded cursor-pointer px-2 py-1 hover:bg-neutral-100',
                        'aria-[current="page"]:bg-neutral-800 aria-[current="page"]:text-white aria-[current="page"]:hover:bg-neutral-700',
                    )}
                    onClick={handleClick}
                >
                    <ChatListItem {...chat} />
                </NavLink>
            ))}
        </div>
    );
};
