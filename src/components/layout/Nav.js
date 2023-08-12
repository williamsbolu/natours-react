import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import styles from './Nav.module.css';
import logoWhite from '../../assets/logo-white.png';
import { NATOURS_API } from '../../lib/api';
import { useContext } from 'react';

import icons from '../../assets/icons.svg';

const Header = (props) => {
    const authCtx = useContext(AuthContext);

    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.navlink}>
                All tours
            </Link>

            <button className={styles['menu-btn']} onClick={props.onShowMenu}>
                <svg>
                    <use xlinkHref={`${icons}#icon-menu`} />
                </svg>
            </button>

            <div className={styles['header-logo']}>
                <img src={logoWhite} alt="Natours-logo white" />
            </div>

            <ul className={styles['nav--users']}>
                {!authCtx.isLoggedIn && (
                    <Link to="/login" className={styles.navlink}>
                        Log in
                    </Link>
                )}
                {!authCtx.isLoggedIn && (
                    <Link to="/sign-up" className={styles.cta}>
                        Sign up
                    </Link>
                )}

                {authCtx.isLoggedIn && (
                    <button className={styles.navlink} onClick={authCtx.logout}>
                        Logout
                    </button>
                )}
                {authCtx.isLoggedIn && (
                    <Link to="/my-account" className={styles['user-link']}>
                        <img
                            src={`${NATOURS_API}/img/users/${authCtx.userPhoto}`}
                            alt="user"
                        />
                        <span>{authCtx.userName.split(' ')[0]}</span>
                    </Link>
                )}
            </ul>
        </nav>
    );
};

export default Header;

// {!authCtx.userStatus.userIsLoggedIn && (
//     <li>
//         <Link to="/login">Log in</Link>
//     </li>
// )}
// {!authCtx.userStatus.userIsLoggedIn && (
//     <li>
//         <Link to="/sign-up" className={styles.cta}>
//             Sign up
//         </Link>
//     </li>
// )}

// {authCtx.userStatus.userIsLoggedIn && (
//     <button className={styles.btn} onClick={authCtx.logout}>
//         Logout
//     </button>
// )}
// {authCtx.userStatus.userIsLoggedIn && (
//     <Link to="/my-account" className={styles['user-link']}>
//         <img
//             src={`${NATOURS_API}/img/users/${authCtx.userStatus.userPhoto}`}
//             alt={`img of ${authCtx.userStatus.userName}`}
//         />
//         <span>{authCtx.userStatus.userName.split(' ')[0]}</span>
//     </Link>
// )}
