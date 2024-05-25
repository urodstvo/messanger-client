import { memo } from 'react';

import { Paperclip } from 'lucide-react';

import { Button } from '@/ui/button';
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from '@/ui/tooltip';

export const FileAttachmentButton = memo(() => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full  active:rounded-xl ">
                        <Paperclip strokeWidth={1} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                    <p>Attach File</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
});
