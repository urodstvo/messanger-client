import { memo } from 'react';
import clsx from 'clsx';

import { Input } from '@/ui/input';

import { useCompact } from '@/lib/hooks/useCompact';

import { SettingsButton } from './SettingsButton';
import { CreateChatButton } from './CreateChatButton';
import { SearchButton } from './SearchButton';
import { ChatList } from './ChatList';

export const Sidebar = memo(() => {
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
});
