import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { NATOURS_API } from '../lib/api';

const AuthContext = React.createContext({
    userStatus: {
        userIsLoggedIn: false,
        userPhoto: '',
        userName: '',
        userEmail: '',
    },
    login: () => {},
    logout: () => {},
    notification: null,
    setNotification: () => {},
});

export const AuthContextProvider = (props) => {
    const [userStatus, setUserStatus] = useState({
        userIsLoggedIn: false,
        userPhoto: '',
        userName: '',
        userEmail: '',
    });
    const [notification, setNotification] = useState(null);

    const loginHandler = (loggedInStatus, user) => {
        setUserStatus({
            userIsLoggedIn: loggedInStatus,
            userPhoto: user.photo,
            userName: user.name,
            userEmail: user.email,
        });
        // setUser()
    };

    const logoutHandler = async () => {
        try {
            const response = await fetch(`${NATOURS_API}/api/v1/users/logout`, {
                method: 'GET',
                // credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Something went wrong, try again later!');
            }

            setUserStatus({
                userIsLoggedIn: false,
                userPhoto: '',
                userName: '',
                userEmail: '',
            });
        } catch (error) {
            setNotification({
                status: 'error',
                message: error.message,
            });
        }
    };

    const setNotificationHandler = (notificationData) => {
        setNotification(notificationData);
    };

    const getLoggedStatus = useCallback(async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: `${NATOURS_API}/api/v1/users/getLoggedInStatus`,
                withCredentials: true,
            });

            console.log(res.data);

            if (res.data) loginHandler(res.data.isLoggedIn, res.data.user);
        } catch (err) {
            console.log(err);
            return;
        }
    }, []);

    // useEffect(() => {
    //     getLoggedStatus();
    // }, [getLoggedStatus]);

    const contextValue = {
        userStatus,
        login: loginHandler,
        logout: getLoggedStatus,
        notification,
        setNotification: setNotificationHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    );
};

export default AuthContext;
