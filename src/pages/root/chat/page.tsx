import { useParams } from 'react-router-dom';

import { useTitle } from '@/lib/hooks';

import { MessageInput } from './components/MessageInput';
import { ChatHeader } from './components/ChatHeader';
import { MessagesList } from './components/MessagesList';

export const ChatPage = () => {
    const params = useParams();
    useTitle(`Chat ${params.chatId} | Messanger`);

    return (
        <div className="flex flex-col gap-1 w-full relative no-scrollbar overflow-y-auto">
            <ChatHeader />
            <MessagesList />
            <MessageInput />
        </div>
    );
};
