import { useLayoutStore } from '@/store/layoutStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { BadgeMinus, Info, Trash, X } from 'lucide-react';

const chatInfo = {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/300',
    isPrivate: true,
};

export const ChatInfoSection = () => {
    const { toggleRightColumn } = useLayoutStore((state) => state.actions);

    return (
        <div className="flex flex-col w-full gap-5">
            <header className="flex items-center w-full ">
                <Button size="icon" variant="ghost" onClick={toggleRightColumn}>
                    <X strokeWidth={1} />
                </Button>
                <h1 className="text-xl text-center flex-1 mr-10">Chat Info</h1>
            </header>
            <section className="flex flex-col items-center">
                <Avatar className="size-[200px] border-2">
                    <AvatarImage src={chatInfo.avatar} alt={chatInfo.name} />
                    <AvatarFallback>{chatInfo.name[0]}</AvatarFallback>
                </Avatar>
                <p className="font-bold">{chatInfo.name}</p>
            </section>
            <section>
                <div className="flex w-full gap-5 items-center rounded-lg hover:bg-neutral-100 p-4">
                    <Info strokeWidth={1.5} />
                    <p>{chatInfo.isPrivate ? 'Private' : 'Public'}</p>
                </div>
            </section>
            <section className="flex gap-2">
                <Button variant="outline" className="gap-2 flex flex-1">
                    <Trash strokeWidth={1.5} />
                    <span>Clear History</span>
                </Button>
                <Button variant="destructive" className="gap-2 flex flex-1">
                    <BadgeMinus strokeWidth={1.5} />
                    <span>Block User</span>
                </Button>
            </section>
        </div>
    );
};
