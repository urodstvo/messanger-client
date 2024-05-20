import { useLayoutStore } from '@/store/layoutStore';
import { Button } from '@/ui/button';
import { X } from 'lucide-react';

export const ChatInfoSection = () => {
    const { toggleRightColumn } = useLayoutStore((state) => state.actions);

    return (
        <section>
            <Button size="icon" variant="ghost" onClick={toggleRightColumn}>
                <X strokeWidth={1} />
            </Button>
        </section>
    );
};
