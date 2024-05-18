import { create } from 'zustand';

type State = {
    isLeftColumnShown: boolean;
    isMiddleColumnShown: boolean;
    isRightColumnShown: boolean;
};

type Actions = {
    toggleLeftColumn: () => void;
    toggleMiddleColumn: () => void;
    toggleRightColumn: () => void;
};

const initialState: State = {
    isLeftColumnShown: true,
    isMiddleColumnShown: true,
    isRightColumnShown: false,
};

export const useLayoutStore = create<State & Actions>((set) => ({
    ...initialState,
    toggleLeftColumn: () => set((state) => ({ isLeftColumnShown: !state.isLeftColumnShown })),
    toggleMiddleColumn: () => set((state) => ({ isMiddleColumnShown: !state.isMiddleColumnShown })),
    toggleRightColumn: () => set((state) => ({ isRightColumnShown: !state.isRightColumnShown })),
}));
