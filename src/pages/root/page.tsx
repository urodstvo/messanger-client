import { useMediaQuery, useTitle } from '@/lib/hooks';
import clsx from 'clsx';

export const RootPage = () => {
    useTitle('Home Page | Messanger');

    const isTablet = useMediaQuery('(min-width: 640px) and (max-width:768px)');

    return (
        <div
            className={clsx('flex flex-col py-10  w-full', {
                'items-start px-5': isTablet,
                'items-center ': !isTablet,
            })}
        >
            <h1 className="text-3xl font-bold">Hello, world!</h1>
        </div>
    );
};
