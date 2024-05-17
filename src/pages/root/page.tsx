import { useTitle } from '@/lib/hooks';

export const RootPage = () => {
    useTitle('Home Page | Messanger');
    return <div>hello world!</div>;
};
