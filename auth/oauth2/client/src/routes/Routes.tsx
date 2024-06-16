import { useRoutes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

import { PrivateRoute } from './PrivateRoute';
import {
    Unauthorized,
    LoginSuccess,
    Admin,
    Login,
    Billing,
    Welcome
} from '../pages';

export const Routes = () => {
    const routes = useRoutes([
        {
            element: <Welcome />,
            path: '/'
        },
        {
            element: <Login />,
            path: '/login'
        },

        // Protected routes that require authentication
        {
            element: <PrivateRoute />,
            children: [
                {
                    path: '/admin',
                    element: <Admin />
                },
                {
                    path: '/billing',
                    element: <Billing />
                }
            ]
        },

        // Unprotected routes, authentication is not required
        {
            element: <LoginSuccess />,
            path: '/login/success'
        },
        {
            element: <Unauthorized />,
            path: '/unauthorized'
        },
        {
            path: '*',
            element: <Navigate to='/' replace />
        }
    ]);

    return <Suspense fallback={null}>{routes}</Suspense>;
};
