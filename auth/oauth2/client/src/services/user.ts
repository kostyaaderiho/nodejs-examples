import axios from 'axios';

import { User } from '../types/user';

export const getUser = async (): Promise<User> => {
    const response = await axios.get('http://localhost:5000/api/v1/users', {
        // Due to server located at different domain, we need to include credentials (cookies) in the request
        // This is necessary for the server to identify the user
        withCredentials: true
    });

    return response.data;
};
