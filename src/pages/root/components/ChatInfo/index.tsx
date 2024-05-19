import { useLayoutStore } from '@/store/layoutStore';

export const ChatInfoSection = () => {
    const layoutStore = useLayoutStore();

    return (
        <section>
            <button
                className="px-5 py-2 bg-blue-400 rounded"
                onClick={() => {
                    layoutStore.toggleRightColumn();
                }}
            >
                back
            </button>
        </section>
    );
};
