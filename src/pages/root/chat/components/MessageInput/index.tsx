import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useChatsStore, type State as ChatsState } from '@/store/chatsStore';

import { Textarea } from '@/ui/textarea';

import { FileAttachmentButton } from './FileAttachmentButton';
import { SendMessageButton } from './SendMessageButton';
import { EmojiButton } from './EmojiButton';

export const MessageInput = () => {
    const { chatId } = useParams();

    const selector = useCallback(
        (state: ChatsState) =>
            (state.chatsList.find((chat) => chat.id === Number(chatId)) as ChatsState['chatsList'][number])
                .messageInput,
        [chatId],
    );
    const messageInput = useChatsStore(selector);
    const { setMessageInput } = useChatsStore((state) => state.actions);

    return (
        <div className="flex justify-center inset-x-0 bottom-0 sticky">
            <div className="flex p-2 border rounded-lg w-[500px] xl:w-full gap-1 bg-white shadow-lg items-end">
                <FileAttachmentButton />
                <Textarea
                    rows={1}
                    autoFocus
                    placeholder="Type Message"
                    value={messageInput}
                    className="rounded items-center flex-1 resize-none p-2 min-h-[44px] max-h-[300px] overflow-y-auto no-scrollbar"
                    onChange={(e) => setMessageInput(e.target.value, Number(chatId))}
                    onInput={(e) => {
                        const target = e.currentTarget;
                        target.style.height = 'inherit';
                        target.style.height = target.scrollHeight + 'px';
                    }}
                />
                <EmojiButton />
                <SendMessageButton />
            </div>
        </div>
    );
};
