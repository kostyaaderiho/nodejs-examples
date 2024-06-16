import { useEffect } from 'react';

export const LoginSuccess = (): JSX.Element => {
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 1000);
    }, []);

    return <div>Thanks for log in!</div>;
};
