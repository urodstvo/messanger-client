import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { RootError, RootPage, RootLayout } from '@/pages/root';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { ChatPage } from './pages/root/chat';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = true;

    if (isAuthenticated) return children;

    return <Navigate to="/auth/login" />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <RootLayout />
            </PrivateRoute>
        ),
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
