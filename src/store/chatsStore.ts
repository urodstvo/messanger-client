import isEqual from 'lodash.isequal';
import { createWithEqualityFn } from 'zustand/traditional';

export type State = {
    chatsList: Array<{
        id: number;
        name: string;
        avatar: string;
        isPrivate: boolean;
        unreadCount: number;
        history: Array<{
            id: number;
            text: string;
            author: {
                id: number;
                name: string;
                avatar: string;
            };
            date: number;
            status: 'error' | 'delievered' | 'readed';
        }>;
        messageInput: string;
    }>;
};

type Actions = {
    actions: {
        setChatsList: (chatsList: State['chatsList']) => void;
        setMessageInput: (messageInput: string, id: number) => void;
    };
};

const initialState: State = {
    chatsList: [
        {
            id: 1,
            name: 'Chat 1',
            avatar: 'https://i.pravatar.cc/300',
            isPrivate: true,
            history: [],
            unreadCount: 0,
            messageInput: '',
        },
        {
            id: 2,
            name: 'Chat 2',
            avatar: 'https://i.pravatar.cc/301',
            isPrivate: false,
            history: [
                {
                    id: 465161,
                    text: 'Hello, how are you?',
                    author: {
                        id: 1,
                        name: 'John',
                        avatar: 'https://i.pravatar.cc/301',
                    },
                    date: 1716237073000,
                    status: 'readed',
                },
                {
                    id: 12341,
                    text: 'Hello',
                    author: {
                        id: 2,
                        name: 'Jane',
                        avatar: 'https://i.pravatar.cc/303',
                    },
                    date: 1716237093000,
                    status: 'readed',
                },
                {
                    id: 4653211,
                    text: 'Hello, how are you?',
                    author: {
                        id: 1,
                        name: 'John',
                        avatar: 'https://i.pravatar.cc/301',
                    },
                    date: 1716323473000,
                    status: 'readed',
                },
                {
                    id: 1212341,
                    text: 'Hello',
                    author: {
                        id: 2,
                        name: 'Jane',
                        avatar: 'https://i.pravatar.cc/303',
                    },
                    date: 1716582673000,
                    status: 'delievered',
                },
            ],
            unreadCount: 0,
            messageInput: '',
        },
        {
            id: 3,
            name: 'Chat 3',
            avatar: 'https://i.pravatar.cc/302',
            isPrivate: false,
            history: [],
            unreadCount: 1,
            messageInput: '',
        },
    ],
};

export const useChatsStore = createWithEqualityFn<State & Actions>(
    (set, get) => ({
        ...initialState,
        actions: {
            setChatsList: (chatsList: State['chatsList']) => set({ chatsList }),
            setMessageInput: (messageInput: string, id: number) => {
                const newChatsList = get().chatsList.map((chat) => (chat.id === id ? { ...chat, messageInput } : chat));
                set({ chatsList: newChatsList });
            },
        },
    }),
    isEqual,
);
