import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { Button } from '@/ui/button';

import { SearchIcon } from 'lucide-react';
import { memo } from 'react';

export const SearchButton = memo(() => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        className="rounded-full size-10 bg-neutral-500 hover:bg-slate-500 active:rounded-xl transition"
                        size="icon"
                    >
                        <SearchIcon strokeWidth={1} color="white" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                    <p>Search Chats</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
});
