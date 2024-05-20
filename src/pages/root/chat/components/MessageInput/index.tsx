import { Textarea } from '@/ui/textarea';
import { FileAttachmentButton } from './FileAttachmentButton';
import { SendMessageButton } from './SendMessageButton';

export const MessageInput = () => {
    return (
        <div className="flex justify-center absolute inset-x-0 bottom-0 ">
            <div className="flex p-2 border rounded-lg w-[500px] xl:w-full gap-1 bg-white shadow-lg">
                <FileAttachmentButton />
                <Textarea
                    rows={1}
                    autoFocus
                    placeholder="Type Message"
                    className="rounded flex-1 resize-none p-2 min-h-[44px] max-h-[300px] overflow-y-auto no-scrollbar"
                    onInput={(e) => {
                        const target = e.currentTarget;
                        target.style.height = 'inherit';
                        target.style.height = target.scrollHeight + 'px';
                    }}
                />
                <SendMessageButton />
            </div>
        </div>
    );
};
