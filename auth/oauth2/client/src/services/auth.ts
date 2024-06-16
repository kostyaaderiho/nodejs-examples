import axios from 'axios';

export const logout = async (): Promise<void> => {
    return axios
        .get('http://localhost:5000/auth/logout', {
            // Due to server located at different domain, we need to include credentials (cookies) in the request
            // This is necessary for the server to identify the user
            withCredentials: true
        })
        .then(console.log);
};
