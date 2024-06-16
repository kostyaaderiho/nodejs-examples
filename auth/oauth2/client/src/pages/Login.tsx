import ReactGoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../modules';

export const Login = () => {
    const { login, googleSSOLogin } = useAuthContext();
    const navigate = useNavigate();

    const redirectToGoogleSSO = () => {
        let timer: number | null = null;
        const openedWindow = googleSSOLogin();

        if (openedWindow) {
            timer = setInterval(() => {
                if (openedWindow.closed) {
                    login().finally(() => {
                        navigate('/');
                        if (timer) {
                            clearInterval(timer);
                        }
                    });
                }
            }, 500);
        }
    };

    return <>{<ReactGoogleButton onClick={redirectToGoogleSSO} />}</>;
};
