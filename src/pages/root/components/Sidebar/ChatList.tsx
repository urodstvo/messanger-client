import { memo, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { useMediaQuery } from '@/lib/hooks';
import { useLayoutStore } from '@/store/layoutStore';

import mock from './mock.json';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

type Chat = (typeof mock.chats)[number];

export const ChatListItem = memo((props: Chat) => {
    return (
        <div key={props.id} className="flex gap-2 items-center whitespace-nowrap justify-center">
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
                <p className="flex-1">{props.last_message}</p>
            </div>
        </div>
    );
});

export const ChatList = () => {
    const params = useParams();

    const isLaptop = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

    const isLeftColumnShown = useLayoutStore((state) => state.isLeftColumnShown);
    const { toggleLeftColumn, toggleMiddleColumn } = useLayoutStore((state) => state.actions);

    const isCompact = useMemo(() => isLaptop && !isLeftColumnShown, [isLaptop, isLeftColumnShown]);

    const handleClick = useCallback(() => {
        if (!isCompact) {
            toggleMiddleColumn();
            toggleLeftColumn();
        }
    }, [isCompact]);

    return (
        <div className="flex flex-col w-full h-full">
            {mock.chats.map((chat: Chat) => (
                <Link
                    key={chat.id}
                    to={`/chat/${chat.id}`}
                    className={clsx('rounded cursor-pointer px-2 py-1 group', {
                        'bg-neutral-800 text-white hover:bg-neutral-700': chat.id === Number(params.chatId),
                        'hover:bg-neutral-100': chat.id !== Number(params.chatId),
                        'is-compact': isCompact,
                    })}
                    onClick={handleClick}
                >
                    <ChatListItem {...chat} />
                </Link>
            ))}
        </div>
    );
};
