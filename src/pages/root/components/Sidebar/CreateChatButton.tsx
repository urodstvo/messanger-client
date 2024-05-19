import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { Button } from '@/ui/button';

import { PencilIcon } from 'lucide-react';
import { memo } from 'react';

export const CreateChatButton = memo(() => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        className="rounded-full size-10 hover:bg-neutral-100 active:rounded-xl active:bg-neutral-200"
                        size="icon"
                    >
                        <PencilIcon strokeWidth={1} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                    <p>Create Chat</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
});
