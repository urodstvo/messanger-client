import clsx from 'clsx';

import { Input } from '@/ui/input';

import { SettingsButton } from './SettingsButton';
import { CreateChatButton } from './CreateChatButton';
import { SearchButton } from './SearchButton';
import { ChatList } from './ChatList';
import { useCompact } from '@/lib/hooks/useCompact';

export const Sidebar = () => {
    const isCompact = useCompact();

    return (
        <div className="flex flex-col gap-1 w-full ">
            <section className="w-full">
                <div
                    className={clsx('flex gap-1', {
                        'flex-col items-center': isCompact,
                    })}
                >
                    {!isCompact ? <Input placeholder="Search" className="rounded flex-1" /> : <SearchButton />}
                    <CreateChatButton />
                    <SettingsButton />
                </div>
            </section>
            <hr />
            <section className="w-full">
                <ChatList />
            </section>
        </div>
    );
};
