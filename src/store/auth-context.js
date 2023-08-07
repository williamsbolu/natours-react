import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import React, { useCallback, useEffect, useState } from 'react';
// import { NATOURS_API } from '../lib/api';
// import axios from 'axios';

const AuthContext = React.createContext({
    userPhoto: '',
    userName: '',
    userRole: '',
    token: '',
    isLoggedIn: false,
    updateUserDetails: () => {},
    //
    userStatus: {
        userIsLoggedIn: false,
        userPhoto: '',
        userName: '',
        userEmail: '',
        userRole: '',
    },
    login: () => {},
    logout: () => {},
    notification: null,
    setNotification: () => {},
});

export const AuthContextProvider = (props) => {
    const navigate = useNavigate();
    // const [userStatus, setUserStatus] = useState({
    //     userIsLoggedIn: false,
    //     userPhoto: '',
    //     userName: '',
    //     userEmail: '',
    //     userRole: '',
    // });
    const [notification, setNotification] = useState(null);

    // for the localstorage function
    const initialToken = localStorage.getItem('token'); // this is the functionality for local Storage
    const userPhoto = localStorage.getItem('userPhoto');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (userToken, user) => {
        localStorage.setItem('token', userToken);
        localStorage.setItem('userPhoto', user.photo);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userRole', user.role);
        setToken(userToken);
    };

    const updateUserDetails = (user) => {
        localStorage.setItem('userPhoto', user.photo);
        localStorage.setItem('userName', user.name);
    };

    const logoutHandler = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userPhoto');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        setToken(null);

        // notify the user
        setNotification({
            status: 'complete',
            message: `logged out user`,
        });

        navigate('/');
    };

    const setNotificationHandler = (notificationData) => {
        setNotification(notificationData);
    };

    console.log(userIsLoggedIn ? 'I am logged in' : ' i am not logged in');

    const contextValue = {
        userPhoto,
        userName,
        userRole,
        token,
        isLoggedIn: userIsLoggedIn,
        updateUserDetails,
        //
        // userStatus,
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

// const getLoggedStatus = useCallback(async () => { // for http only coookie
//     try {
//         const res = await axios({
//             method: 'GET',
//             url: `${NATOURS_API}/api/v1/users/getLoggedInStatus`,
//             withCredentials: true,
//         });

//         console.log(res.data);

//         // if the user status was loggedIn
//         if (res.data.isLoggedIn) loginHandler(res.data.isLoggedIn, res.data.user);
//     } catch (err) {
//         console.log(err);
//         return;
//     }
// }, []);

// useEffect(() => {
//     getLoggedStatus();
// }, [getLoggedStatus]);

// const loginHandler = (loggedInStatus, user) => {
//     setUserStatus({
//         userIsLoggedIn: loggedInStatus,
//         userPhoto: user.photo,
//         userName: user.name,
//         userEmail: user.email,
//         userRole: user.role,
//     });
// };

// const logoutHandler = async () => {
//     try {
//         const response = await fetch(`${NATOURS_API}/api/v1/users/logout`, {
//             method: 'GET',
//             credentials: 'include',
//         });

//         if (!response.ok) {
//             throw new Error('Something went wrong, try again later!');
//         }

//         setUserStatus({
//             userIsLoggedIn: false,
//             userPhoto: '',
//             userName: '',
//             userEmail: '',
//         });

//         // notify the user
//         setNotification({
//             status: 'complete',
//             message: `logged out user`,
//         });

//         navigate('/');
//     } catch (error) {
//         setNotification({
//             status: 'error',
//             message: error.message,
//         });
//     }
// };
