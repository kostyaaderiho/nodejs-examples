import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../modules';

export type PrivateRouteProps = {
    redirectPath?: string;
    children?: React.ReactNode;
};

export const PrivateRoute = ({
    redirectPath = '/unauthorized',
    children
}: PrivateRouteProps): JSX.Element => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};
