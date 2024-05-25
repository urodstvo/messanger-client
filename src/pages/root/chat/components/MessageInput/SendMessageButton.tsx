import { memo } from 'react';

import { Send } from 'lucide-react';

import { Button } from '@/ui/button';
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from '@/ui/tooltip';

export const SendMessageButton = memo(() => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full  active:rounded-xl">
                        <Send strokeWidth={1} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                    <p>Send Message</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
});
