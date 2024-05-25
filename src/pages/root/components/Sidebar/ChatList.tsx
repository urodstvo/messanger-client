import { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { useShallow } from 'zustand/react/shallow';

import { useLayoutStore } from '@/store/layoutStore';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { useChatsStore, State as ChatsState } from '@/store/chatsStore';
import { useCompact } from '@/lib/hooks/useCompact';

type Chat = {
    id: number;
    name: string;
    avatar: string;
    lastMessage: ChatsState['chatsList'][number]['history'][number];
    onClick?: () => void;
};

export const ChatListItem = memo((props: Chat) => {
    return (
        <div
            key={props.id}
            className="flex gap-2 items-center whitespace-nowrap justify-center"
            onClick={props.onClick}
        >
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
                <p className="flex-1">{props.lastMessage?.text || ''}</p>
            </div>
        </div>
    );
});

const chatSelector = (state: ChatsState) =>
    state.chatsList.map((chat) => ({
        id: chat.id,
        name: chat.name,
        avatar: chat.avatar,
        lastMessage: chat.history[chat.history.length - 1],
    }));

export const ChatList = () => {
    const isCompact = useCompact();
    const chats = useChatsStore(useShallow(chatSelector));

    const { toggleLeftColumn, toggleMiddleColumn } = useLayoutStore((state) => state.actions);

    const handleClick = useCallback(() => {
        if (!isCompact) {
            toggleMiddleColumn();
            toggleLeftColumn();
        }
    }, [isCompact]);

    return (
        <div className="flex flex-col w-full h-full">
            {chats.map((chat: Chat) => (
                <NavLink
                    key={`chat-${chat.id}`}
                    to={`/chat/${chat.id}`}
                    className={clsx(
                        'rounded cursor-pointer px-2 py-1 group hover:bg-neutral-100',
                        'aria-[current="page"]:bg-neutral-800 aria-[current="page"]:text-white aria-[current="page"]:hover:bg-neutral-700',
                        {
                            'is-compact': isCompact,
                        },
                    )}
                >
                    <ChatListItem key={`chat-item-${chat.id}`} {...chat} onClick={handleClick} />
                </NavLink>
            ))}
        </div>
    );
};
