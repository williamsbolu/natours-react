import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/layout/LoginForm';

import AuthContext from '../store/auth-context';
import { NATOURS_API } from '../lib/api';

const Login = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const loginHandler = async (loginData) => {
        setIsLoading(true);

        try {
            const response = await fetch(`${NATOURS_API}/api/v1/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const userData = await response.json();

            console.log(userData);

            authCtx.login(true, userData.data.user); // meaning d user is logged in cuz we dont store the token

            // notify the user
            authCtx.setNotification({
                status: 'complete',
                message: `welcome ${userData.data.user.name.split(' ')[0]}`,
            });

            // redirect to the homepage
            navigate('/', { replace: true });
        } catch (err) {
            console.log(err);
            authCtx.setNotification({
                status: 'error',
                message: err.message,
            });
        }

        setIsLoading(false);
    };

    return <LoginForm onLogin={loginHandler} isLoading={isLoading} />;
};

export default Login;

// fetch('https://natours-api-mw9e.onrender.com/api/v1/users/getLoggedInStatus', {
//     method: 'POST',
//     body: JSON.stringify(),
//     headers: {
//         'content-Type': 'application./json',
//         authorization: `Bearer ${token}`,
//     },
// });
