import { useParams } from 'react-router-dom';

import { useTitle } from '@/lib/hooks';

import { MessageInput } from './components/MessageInput';
import { ChatHeader } from './components/ChatHeader';

export const ChatPage = () => {
    const params = useParams();
    useTitle(`Chat ${params.chatId} | Messanger`);

    return (
        <div className="flex flex-col gap-1 w-full">
            <ChatHeader />
            <div className="relative flex-1">
                <section></section>
                <section></section>
                <section></section>
                <MessageInput />
            </div>
        </div>
    );
};
