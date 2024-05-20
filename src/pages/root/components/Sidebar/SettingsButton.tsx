import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { Button } from '@/ui/button';

import { SettingsIcon } from 'lucide-react';
import { memo } from 'react';

export const SettingsButton = memo(() => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="rounded-full active:rounded-xl " size="icon">
                        <SettingsIcon strokeWidth={1} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Open Settings</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
});
