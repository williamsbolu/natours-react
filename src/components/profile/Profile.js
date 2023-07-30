import { useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import useHttp from '../../hooks/use-http';

import UserSettings from './UserSettings';
import styles from './Profile.module.css';
import { getUserData } from '../../lib/api';
import icons from '../../assets/icons.svg';

const Profile = (props) => {
    const { sendRequest, status, data: userData, error } = useHttp(getUserData, true);

    useEffect(() => {
        console.log('profile running');
        sendRequest();
    }, [sendRequest]);

    return (
        <section className={styles['user-view']}>
            <nav className={styles['user-view__menu']}>
                <div className={styles['side-nav']}>
                    <div className={styles['user-nav']}>
                        <NavLink
                            to="/my-account"
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
                            to="/my-account/tours"
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
                            to="/my-account/reviews"
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
                            to="/my-account/billing"
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
                    <div className={styles['admin-nav']}>
                        <h5 className={styles['admin-nav__heading']}>Admin</h5>
                        <div className={styles['side-nav']}>
                            <NavLink
                                to="/my-account/manage-tours"
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
                                to="/my-account/manage-users"
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
                                to="/my-account/manage-reviews"
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
                                to="/my-account/manage-bookings"
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
                </div>
            </nav>
            <div className={styles['user-view__content']}>
                <Routes>
                    <Route path="/" element={<UserSettings />} />
                </Routes>
            </div>
        </section>
    );
};

export default Profile;
