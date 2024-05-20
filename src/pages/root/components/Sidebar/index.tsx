import clsx from 'clsx';

import { Input } from '@/ui/input';
import { useLayoutStore } from '@/store/layoutStore';

import { useMediaQuery } from '@/lib/hooks';
import { SettingsButton } from './SettingsButton';
import { CreateChatButton } from './CreateChatButton';
import { SearchButton } from './SearchButton';
import { ChatList } from './ChatList';

export const Sidebar = () => {
    const isLeftColumnShown = useLayoutStore((state) => state.isLeftColumnShown);
    const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

    return (
        <div className="flex flex-col gap-1 w-full ">
            <section className="w-full">
                <div
                    className={clsx('flex gap-1', {
                        'flex-col items-center': isTablet && !isLeftColumnShown,
                    })}
                >
                    {!(isTablet && !isLeftColumnShown) ? (
                        <Input placeholder="Search" className="rounded flex-1" />
                    ) : (
                        <SearchButton />
                    )}
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
