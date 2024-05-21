import { Button } from '@/ui/button';
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from '@/ui/tooltip';
import { Send } from 'lucide-react';

export const SendMessageButton = () => {
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
};
