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
            const res = await axios({
                method: 'POST',
                url: `${NATOURS_API}/api/v1/users/signup`,
                data: userSignUpData,
                withCredentials: true,
            });

            console.log(res);

            const userData = res.data.user;
            // console.log(userData);

            authCtx.login(true, userData); // meaning d user is logged in cuz we dont store the token

            // notify the user
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
                message: err.message,
            });
        }

        setIsLoading(false);
    };

    return <SignUpForm onSignUp={signUpHandler} isLoading={isLoading} />;
};

export default SignUp;
