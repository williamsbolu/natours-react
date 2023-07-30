import { useContext } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import UserSettings from './UserSettings';
import styles from './Profile.module.css';
import icons from '../../assets/icons.svg';

const Profile = (props) => {
    const authCtx = useContext(AuthContext);

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
                            to="tours"
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
                    {authCtx.userStatus.userRole === 'admin' && (
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
                    <Route path="/" element={<UserSettings />} />
                </Routes>
            </div>
        </section>
    );
};

export default Profile;
