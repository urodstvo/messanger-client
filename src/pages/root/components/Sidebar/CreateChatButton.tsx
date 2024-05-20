import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { Button } from '@/ui/button';

import { PencilIcon } from 'lucide-react';
import { memo } from 'react';

export const CreateChatButton = memo(() => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="rounded-full active:rounded-xl" size="icon">
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
