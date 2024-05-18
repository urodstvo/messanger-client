import { Input } from '@/ui/input';
import { useLayoutStore } from '@/store/layoutStore';

import mock from './mock.json';
import { useMediaQuery } from '@/lib/hooks';
import { NavLink } from 'react-router-dom';

type Chat = (typeof mock.chats)[number];

export const Sidebar = () => {
    const layoutStore = useLayoutStore();

    const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

    const handleClick = () => {
        if (layoutStore.isLeftColumnShown) {
            layoutStore.toggleLeftColumn();
            layoutStore.toggleMiddleColumn();
        }
    };

    return (
        <div className="flex flex-col w-full">
            <section className="w-full">
                <Input placeholder="Search" />
            </section>
            <section className="w-full">
                <ul className="flex flex-col">
                    {mock.chats.map((chat: Chat) => (
                        <NavLink key={chat.id} to={`/chat/${chat.id}`}>
                            <li
                                key={chat.id}
                                className="flex gap-2 items-center rounded hover:bg-neutral-100 cursor-pointer px-2 py-1 whitespace-nowrap justify-center"
                                onClick={handleClick}
                            >
                                <div className="rounded-full bg-black size-10 overflow-hidden border border-neutral-700 flex">
                                    <img className="size-full object-cover" src={chat.avatar} alt={chat.name} />
                                </div>
                                {!(isTablet && layoutStore.isMiddleColumnShown) && (
                                    <div className="flex flex-col gap-0 flex-1">
                                        <div className="font-bold">{chat.name}</div>
                                        <p className="flex-1">{chat.last_message}</p>
                                    </div>
                                )}
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </section>
        </div>
    );
};
