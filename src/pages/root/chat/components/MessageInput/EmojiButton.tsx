import { memo } from 'react';

import { Smile } from 'lucide-react';

import { Button } from '@/ui/button';
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from '@/ui/tooltip';

export const EmojiButton = memo(() => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full active:rounded-xl">
                        <Smile strokeWidth={1} size={24} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                    <p>Add Emoji</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
});
