import { DateGroup } from './DateGroup';

export const MessagesList = () => {
    return (
        <div className="flex-1 justify-end gap-20 flex flex-col p-4 xl:px-0">
            <DateGroup date={new Date()} />
            <DateGroup date={new Date()} />
            <DateGroup date={new Date()} />
            <DateGroup date={new Date()} />
        </div>
    );
};
