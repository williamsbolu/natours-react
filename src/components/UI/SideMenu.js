import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Modal from './Modal';

import AuthContext from '../../store/auth-context';
import styles from './SideMenu.module.css';
import logo from '../../assets/logo-green-small.png';
import icons from '../../assets/icons.svg';

const SideMenu = (props) => {
    const authCtx = useContext(AuthContext);

    const logOutHandler = (e) => {
        e.preventDefault();

        authCtx.logout();

        props.onShowMenu();
    };

    return (
        <Modal menuIsEnabled={props.menuIsEnabled} onShowMenu={props.onShowMenu}>
            <div className={styles['menu-header']}>
                <figure className={styles['img-box']}>
                    <img src={logo} alt="natours-logo" />
                </figure>

                <button className={styles['cancel-btn']} onClick={props.onShowMenu}>
                    <svg className={styles['menu__icon']}>
                        <use xlinkHref={`${icons}#icon-x`} />
                    </svg>
                </button>
            </div>

            <div>
                <ul className={styles['menu-list']}>
                    <li className={styles['menu-item']}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? `${styles['link-active']}` : ''
                            }
                            onClick={props.onShowMenu}
                        >
                            <svg className={styles['link__icon']}>
                                <use xlinkHref={`${icons}#icon-map-pin`} />
                            </svg>
                            All Tours
                        </NavLink>
                    </li>
                    {!authCtx.isLoggedIn && (
                        <li className={styles['menu-item']}>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? `${styles['link-active']}` : ''
                                }
                                onClick={props.onShowMenu}
                            >
                                <svg className={styles['link__icon']}>
                                    <use xlinkHref={`${icons}#icon-user`} />
                                </svg>
                                Login / Register
                            </NavLink>
                        </li>
                    )}
                    <li className={styles['menu-item']}>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? `${styles['link-active']}` : ''
                            }
                            onClick={props.onShowMenu}
                        >
                            <svg className={styles['link__icon']}>
                                <use xlinkHref={`${icons}#icon-message-circle`} />
                            </svg>
                            Contact Us
                        </NavLink>
                    </li>
                </ul>
                {authCtx.isLoggedIn && (
                    <ul className={styles['menu-list']}>
                        <h3>My Account</h3>

                        <li>
                            <NavLink
                                to="/my-account"
                                className={({ isActive }) =>
                                    isActive ? `${styles['link-active']}` : ''
                                }
                                onClick={props.onShowMenu}
                            >
                                <svg className={styles['link__icon']}>
                                    <use xlinkHref={`${icons}#icon-settings`} />
                                </svg>
                                Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/my-account/bookings"
                                className={({ isActive }) =>
                                    isActive ? `${styles['link-active']}` : ''
                                }
                                onClick={props.onShowMenu}
                            >
                                <svg className={styles['link__icon']}>
                                    <use xlinkHref={`${icons}#icon-briefcase`} />
                                </svg>
                                My bookings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/my-account/reviews"
                                className={({ isActive }) =>
                                    isActive ? `${styles['link-active']}` : ''
                                }
                                onClick={props.onShowMenu}
                            >
                                <svg className={styles['link__icon']}>
                                    <use xlinkHref={`${icons}#icon-star`} />
                                </svg>
                                My reviews
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/my-account/billing"
                                className={({ isActive }) =>
                                    isActive ? `${styles['link-active']}` : ''
                                }
                                onClick={props.onShowMenu}
                            >
                                <svg className={styles['link__icon']}>
                                    <use xlinkHref={`${icons}#icon-credit-card`} />
                                </svg>
                                Billing
                            </NavLink>
                        </li>
                    </ul>
                )}
                {authCtx.isLoggedIn && (
                    <ul className={styles['menu-list']}>
                        <li>
                            <NavLink
                                to="/logout"
                                className={({ isActive }) =>
                                    isActive ? `${styles['link-active']}` : ''
                                }
                                onClick={logOutHandler}
                            >
                                Sign out
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>

            <footer className={styles['menu-footer']}>
                <p>&copy; 2023 Natours, Inc</p>

                <ul className={styles['link-box']}>
                    <li>
                        <Link to="/">About</Link>
                    </li>
                    <li>
                        <Link to="/">Download apps</Link>
                    </li>
                    <li>
                        <Link to="/">Become a guide</Link>
                    </li>
                    <li>
                        <Link to="/">careers</Link>
                    </li>
                </ul>
            </footer>
        </Modal>
    );
};

export default SideMenu;
