import { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { useMediaQuery } from '@/lib/hooks';
import { useLayoutStore } from '@/store/layoutStore';

import mock from './mock.json';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

type Chat = (typeof mock.chats)[number];

export const ChatListItem = (props: Chat & { isSelected: boolean }) => {
    const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
    const { toggleLeftColumn, toggleMiddleColumn, isLeftColumnShown } = useLayoutStore();

    const isCompact = isTablet && !isLeftColumnShown;

    const handleClick = useCallback(() => {
        if (!isCompact) {
            toggleMiddleColumn();
            toggleLeftColumn();
        }
    }, [isCompact]);

    return (
        <Link
            to={`/chat/${props.id}`}
            className={clsx('rounded cursor-pointer px-2 py-1', {
                'bg-neutral-800 text-white hover:bg-neutral-700': props.isSelected,
                'hover:bg-neutral-100': !props.isSelected,
            })}
        >
            <div
                key={props.id}
                className="flex gap-2 items-center whitespace-nowrap justify-center"
                onClick={handleClick}
            >
                <Avatar>
                    <AvatarImage src={props.avatar} alt={props.name} />
                    <AvatarFallback>
                        {props.name
                            .split('')
                            .map((c) => c[0])
                            .join('')}
                    </AvatarFallback>
                </Avatar>
                {!isCompact && (
                    <div className="flex flex-col gap-0 flex-1">
                        <div className="font-bold">{props.name}</div>
                        <p className="flex-1">{props.last_message}</p>
                    </div>
                )}
            </div>
        </Link>
    );
};

export const ChatList = () => {
    const params = useParams();

    return (
        <div className="flex flex-col w-full h-full">
            {mock.chats.map((chat: Chat) => (
                <ChatListItem key={chat.id} {...chat} isSelected={chat.id === Number(params.chatId)} />
            ))}
        </div>
    );
};
