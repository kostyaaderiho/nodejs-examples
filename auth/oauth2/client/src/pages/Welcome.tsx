import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../modules';

export const Welcome = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const onLogout = async () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome to the OAuth2 Client</h1>
            {user ? (
                <>
                    <p>{user.fullName}</p>
                    <p>
                        <img src={user.picture} />
                    </p>
                    <button onClick={onLogout}>Log out</button>
                </>
            ) : (
                <p>
                    <Link to={'/login'}>Login</Link>
                </p>
            )}
        </div>
    );
};
