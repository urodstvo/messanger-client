import { useParams } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';

import { useTitle } from '@/lib/hooks';

import { MessageInput } from './components/MessageInput';
import { ChatHeader } from './components/ChatHeader';
import { MessagesList } from './components/MessagesList';

export const ChatPage = () => {
    const params = useParams();
    useTitle(`Chat ${params.chatId} | Messanger`);

    const listRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const element = listRef.current as HTMLDivElement;
        element.scrollTo(0, element.scrollHeight);
    }, []);

    return (
        <div className="flex flex-col gap-1 w-full relative no-scrollbar overflow-y-auto" ref={listRef}>
            <ChatHeader />
            <MessagesList />
            <MessageInput />
        </div>
    );
};
