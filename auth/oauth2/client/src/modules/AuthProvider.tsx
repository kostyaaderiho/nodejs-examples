import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback
} from 'react';

import { getUser, logout as onLogout } from '../services';
import { User } from '../types/user';

const AuthContext = createContext<{
    user: User | null;
    isLoaded: boolean;
    googleSSOLogin: () => Window | null;
    login: () => Promise<void>;
    logout: () => void;
}>({
    user: null,
    isLoaded: false,
    googleSSOLogin: () => null,
    login: () => Promise.resolve(),
    logout: () => {}
});

export const useAuthContext = () => useContext(AuthContext);

export type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const googleSSOLogin = useCallback(
        () =>
            window.open(
                'http://localhost:5000/auth/login/google',
                '_blank',
                'width=500,height=600'
            ),
        []
    );

    const login = useCallback(() => getUser().then(setUser), []);

    const logout = useCallback(() => onLogout().then(() => setUser(null)), []);

    const value = useMemo(
        () => ({ user, isLoaded, googleSSOLogin, login, logout }),
        [isLoaded, user, googleSSOLogin, logout, login]
    );

    useEffect(() => {
        login().finally(() => setIsLoaded(true));
    }, [login]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
