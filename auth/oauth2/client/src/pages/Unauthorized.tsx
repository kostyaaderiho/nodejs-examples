import { Link } from 'react-router-dom';

export const Unauthorized = () => (
    <div>
        <h1>401</h1>
        <p>You're not authorized</p>
        <p>
            <Link to={'/login'}>Login</Link>
        </p>
    </div>
);
