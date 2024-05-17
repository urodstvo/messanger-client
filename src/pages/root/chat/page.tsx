import { useParams } from 'react-router-dom';

export const ChatPage = () => {
    const params = useParams();
    return <div>{params.chatId}</div>;
};
