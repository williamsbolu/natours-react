import React, { useCallback, useEffect, useState } from 'react';
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
            const response = await fetch(`${NATOURS_API}/api/v1/users/logout`);

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
            const response = await fetch(`${NATOURS_API}/api/v1/users/getLoggedInStatus`);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const loginStatusData = await response.json();
            console.log(loginStatusData);

            if (loginStatusData.isLoggedIn)
                loginHandler(loginStatusData.isLoggedIn, loginStatusData.user);
        } catch (err) {
            console.log(err);
            return;
        }
    }, []);

    useEffect(() => {
        getLoggedStatus();
    }, [getLoggedStatus]);

    const contextValue = {
        userStatus,
        login: loginHandler,
        logout: logoutHandler,
        notification,
        setNotification: setNotificationHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    );
};

export default AuthContext;
