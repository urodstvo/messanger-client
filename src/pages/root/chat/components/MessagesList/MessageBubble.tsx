import { Avatar, AvatarImage } from '@/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import clsx from 'clsx';

type MessageBubbleProps = {
    author: {
        name: string;
        avatar: string;
    };
    message: string;
    date: Date;
    isMine: boolean;
    status: 'error' | 'delievered' | 'readed';
};

const formatDate = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat('ru', {
        hourCycle: 'h24',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);

    return formattedDate;
};

export const MessageBubble = (props: MessageBubbleProps) => {
    return (
        <div
            className={clsx('flex w-full items-end gap-4 relative', {
                'justify-start': !props.isMine,
                'justify-end xl:justify-start': props.isMine,
            })}
        >
            <Avatar className="hidden sticky bottom-0 xl:flex">
                <AvatarImage src={props.author.avatar} alt={props.author.name} />
                <AvatarFallback>{props.author.name[0]}</AvatarFallback>
            </Avatar>
            <div
                className={clsx(
                    'p-2 flex items-end gap-2 rounded-lg w-fit relative',
                    'before:absolute before:content-[" "]  before:bottom-0 before:z-[-2] before:size-4 ',
                    'after:absolute after:content-[" "]  after:bottom-0 after:z-[-1] after:size-4 after:bg-neutral-100 ',
                    {
                        'before:-left-4 after:-left-4 after:rounded-br-full rounded-bl-none  bg-neutral-200 before:bg-neutral-200':
                            !props.isMine,
                        'before:-right-4 after:-right-4 after:rounded-bl-full rounded-br-none xl:before:-left-4 xl:after:-left-4 xl:after:rounded-br-full xl:after:rounded-bl-none xl:rounded-bl-none xl:rounded-br-lg bg-slate-200 before:bg-slate-200':
                            props.isMine,
                        'border-b-2 border-b-slate-400 before:border-b-2 before:border-b-slate-400 before:-bottom-[2px] bg-slate-300 before:bg-slate-300':
                            props.status === 'delievered',
                    },
                )}
            >
                <div className="max-w-[300px] xl:max-w-[600px]">
                    {props.message.split('\n').map((line, ind) => (
                        <p key={ind}>{line}</p>
                    ))}
                </div>
                <div className="text-sm text-muted-foreground">{formatDate(props.date)}</div>
            </div>
        </div>
    );
};
