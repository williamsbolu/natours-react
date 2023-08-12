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
            // const res = await axios({
            //     method: 'POST',
            //     url: `${NATOURS_API}/api/v1/users/login`,
            //     data: loginData,
            //     withCredentials: true,
            // });
            const res = await axios({
                method: 'POST',
                url: `${NATOURS_API}/api/v1/users/login`,
                data: loginData,
            });

            const userData = res.data.user;

            // authCtx.login(true, userData); // for httpOnly functionality
            authCtx.login(res.data.token, userData); // for local storage

            // // notify the user
            authCtx.setNotification({
                status: 'complete',
                message: `welcome ${userData.name.split(' ')[0]}`,
            });

            // redirect to the homepage
            navigate('/');
        } catch (err) {
            console.log(err);
            authCtx.setNotification({
                status: 'error',
                message: err.response.data.message,
            });
        }

        setIsLoading(false);
    };

    return <LoginForm onLogin={loginHandler} isLoading={isLoading} />;
};

export default Login;
