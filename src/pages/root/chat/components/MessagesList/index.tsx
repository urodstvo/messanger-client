import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useChatsStore, State as ChatsState } from '@/store/chatsStore';

import { DateGroup } from './DateGroup';

type MessagesHistory = ChatsState['chatsList'][number]['history'];

const formatList = (messages: MessagesHistory) => {
    const sortedByTimestamp = messages.sort((a, b) => a.date - b.date);

    const groupedByDate: Array<typeof messages> = [];

    for (let i = 0; i < sortedByTimestamp.length; i++) {
        const message = sortedByTimestamp[i];

        const lastGroup = groupedByDate[groupedByDate.length - 1];

        if (!lastGroup) {
            groupedByDate.push([message]);
            continue;
        }

        const messageDate = new Date(message.date).toDateString();
        const lastGroupDate = new Date(lastGroup[0].date).toDateString();

        if (messageDate === lastGroupDate) lastGroup.push(message);
        else groupedByDate.push([message]);
    }

    return groupedByDate;
};

export const MessagesList = () => {
    const { chatId } = useParams();

    const selector = useCallback(
        (state: ChatsState) => state.chatsList.find((chat) => chat.id === Number(chatId as string))?.history,
        [chatId],
    );

    const history = useChatsStore(selector);

    // TODO: add error handling
    if (!history) throw new Error('Chat not found');

    const formatted = useMemo(() => formatList(history), [history]);

    // console.log(formatted);

    return (
        <div className="flex-1 justify-end gap-20 flex flex-col p-4 xl:px-0">
            {formatted.map((group) => (
                <DateGroup key={`group-${group[0].date}`} date={new Date(group[0].date)} messages={group} />
            ))}
        </div>
    );
};
