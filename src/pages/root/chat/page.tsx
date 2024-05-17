import { useTitle } from '@/lib/hooks';
import { useParams } from 'react-router-dom';

export const ChatPage = () => {
    const params = useParams();
    useTitle(`Chat ${params.chatId} | Messanger`);

    return <div>{params.chatId}</div>;
};
