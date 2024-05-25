import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { RootError, RootPage, RootLayout } from '@/pages/root';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { ChatPage } from './pages/root/chat';

const checkIsAuthenticated = () => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return redirect('/auth/login');
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: '/',
        loader: checkIsAuthenticated,
        element: <RootLayout />,
        errorElement: <RootError />,
        children: [
            {
                index: true,
                element: <RootPage />,
            },
            {
                path: 'chat/:chatId',
                element: <ChatPage />,
            },
        ],
    },
    {
        path: '/auth',
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
]);

export const App = () => {
    return <RouterProvider router={router} />;
};
