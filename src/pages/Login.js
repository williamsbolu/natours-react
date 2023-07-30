import axios from 'axios';
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
            const res = await axios({
                method: 'POST',
                url: `${NATOURS_API}/api/v1/users/login`,
                data: loginData,
                // withCredentials: true,
            });

            console.log(res);

            const userData = res.data.user;
            // console.log(userData);

            authCtx.login(true, userData); // meaning d user is logged in cuz we dont store the token

            // // notify the user
            authCtx.setNotification({
                status: 'complete',
                message: `welcome ${userData.name.split(' ')[0]}`,
            });

            // // redirect to the homepage
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
