import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpForm from '../components/layout/SignUpForm';

import AuthContext from '../store/auth-context';
import { NATOURS_API } from '../lib/api';

const SignUp = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const signUpHandler = async (userSignUpData) => {
        setIsLoading(true);

        try {
            // const res = await axios({
            //     method: 'POST',
            //     url: `${NATOURS_API}/api/v1/users/signup`,
            //     data: userSignUpData,
            //     withCredentials: true,
            // });
            const res = await axios({
                method: 'POST',
                url: `${NATOURS_API}/api/v1/users/signup`,
                data: userSignUpData,
            });

            const userData = res.data.user;

            // authCtx.login(true, userData); // meaning d user is logged in cuz we dont store the token
            authCtx.login(res.data.token, userData); // for local

            // notify the user
            authCtx.setNotification({
                status: 'complete',
                message: `welcome ${userData.name.split(' ')[0]}`,
            });

            // redirect to the homepage
            navigate('/');
        } catch (err) {
            console.log(err);

            if (
                err.response.status === 400 &&
                err.response.data.message.startsWith('Duplicate field value')
            ) {
                authCtx.setNotification({
                    status: 'error',
                    message: 'There is already an account with this email address.',
                });
            } else {
                authCtx.setNotification({
                    status: 'error',
                    message: err.response.data.message,
                });
            }
        }

        setIsLoading(false);
    };

    return <SignUpForm onSignUp={signUpHandler} isLoading={isLoading} />;
};

export default SignUp;
