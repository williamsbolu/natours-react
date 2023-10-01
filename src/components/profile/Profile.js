import { useContext, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import UserSettings from './UserSettings';
import Bookings from './Bookings';
import styles from './Profile.module.css';
import axios from 'axios';
import icons from '../../assets/icons.svg';
import { NATOURS_API } from '../../lib/api';

const Profile = () => {
    const [updateIsLoading, setUpdateIsLoading] = useState(false);
    const [passwordChangeIsLoading, setPasswordChangeIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    const updateUserHandler = async (data) => {
        setUpdateIsLoading(true);
        try {
            const res = await axios({
                method: 'PATCH',
                url: `${NATOURS_API}/api/v1/users/updateMe`,
                data,
                headers: {
                    Authorization: `Bearer ${authCtx.token}`,
                },
            });

            authCtx.updateUserDetails(res.data.data.user); // delete

            authCtx.setNotification({
                status: 'complete',
                message: `User data Updated`,
            });
        } catch (err) {
            authCtx.setNotification({
                status: 'error',
                message: err.response.data.message,
            });
        }
        setUpdateIsLoading(false);
    };

    const changePasswordHandler = async (passwordData) => {
        setPasswordChangeIsLoading(true);
        try {
            await axios({
                method: 'PATCH',
                url: `${NATOURS_API}/api/v1/users/updateMyPassword`,
                data: passwordData,
                headers: {
                    Authorization: `Bearer ${authCtx.token}`,
                },
            });

            authCtx.setNotification({
                status: 'complete',
                message: `Password Updated!`,
            });
        } catch (err) {
            authCtx.setNotification({
                status: 'error',
                message: err.response.data.message,
            });
        }
        setPasswordChangeIsLoading(false);
    };

    return (
        <section className={styles['user-view']}>
            <nav className={styles['user-view__menu']}>
                <div className={styles['side-nav']}>
                    <div className={styles['user-nav']}>
                        <NavLink
                            to=""
                            className={({ isActive }) =>
                                isActive ? styles['side-nav--active'] : ''
                            }
                        >
                            <span>
                                <svg>
                                    <use xlinkHref={`${icons}#icon-settings`} />
                                </svg>
                                Settings
                            </span>
                        </NavLink>

                        <NavLink
                            to="bookings"
                            className={({ isActive }) =>
                                isActive ? styles['side-nav--active'] : ''
                            }
                        >
                            <span>
                                <svg>
                                    <use xlinkHref={`${icons}#icon-briefcase`} />
                                </svg>
                                My bookings
                            </span>
                        </NavLink>

                        <NavLink
                            to="reviews"
                            className={({ isActive }) =>
                                isActive ? styles['side-nav--active'] : ''
                            }
                        >
                            <span>
                                <svg>
                                    <use xlinkHref={`${icons}#icon-star`} />
                                </svg>
                                My reviews
                            </span>
                        </NavLink>

                        <NavLink
                            to="billing"
                            className={({ isActive }) =>
                                isActive ? styles['side-nav--active'] : ''
                            }
                        >
                            <span>
                                <svg>
                                    <use xlinkHref={`${icons}#icon-credit-card`} />
                                </svg>
                                Billing
                            </span>
                        </NavLink>
                    </div>
                    {authCtx.userRole === 'admin' && (
                        <div className={styles['admin-nav']}>
                            <h5 className={styles['admin-nav__heading']}>Admin</h5>
                            <div className={styles['side-nav']}>
                                <NavLink
                                    to="manage-tours"
                                    className={({ isActive }) =>
                                        isActive ? styles['side-nav--active'] : ''
                                    }
                                >
                                    <span>
                                        <svg>
                                            <use xlinkHref={`${icons}#icon-map`} />
                                        </svg>
                                        Manage tours
                                    </span>
                                </NavLink>

                                <NavLink
                                    to="manage-users"
                                    className={({ isActive }) =>
                                        isActive ? styles['side-nav--active'] : ''
                                    }
                                >
                                    <span>
                                        <svg>
                                            <use xlinkHref={`${icons}#icon-users`} />
                                        </svg>
                                        Manage users
                                    </span>
                                </NavLink>

                                <NavLink
                                    to="manage-reviews"
                                    className={({ isActive }) =>
                                        isActive ? styles['side-nav--active'] : ''
                                    }
                                >
                                    <span>
                                        <svg>
                                            <use xlinkHref={`${icons}#icon-star`} />
                                        </svg>
                                        Manage reviews
                                    </span>
                                </NavLink>

                                <NavLink
                                    to="manage-bookings"
                                    className={({ isActive }) =>
                                        isActive ? styles['side-nav--active'] : ''
                                    }
                                >
                                    <span>
                                        <svg>
                                            <use xlinkHref={`${icons}#icon-briefcase`} />
                                        </svg>
                                        Manage bookings
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            <div className={styles['user-view__content']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <UserSettings
                                onChangePassword={changePasswordHandler}
                                onUpdateUser={updateUserHandler}
                                updateIsLoading={updateIsLoading}
                                passwordChangeIsLoading={passwordChangeIsLoading}
                            />
                        }
                    />
                    <Route path="/bookings" element={<Bookings />} />
                </Routes>
            </div>
        </section>
    );
};

export default Profile;
