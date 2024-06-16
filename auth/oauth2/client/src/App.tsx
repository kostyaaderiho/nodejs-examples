import { useAuthContext } from './modules';
import { Routes } from './routes';

import './App.css';

export const App = () => {
    const { isLoaded } = useAuthContext();

    if (!isLoaded) return <>Loading...</>;

    return <Routes />;
};
