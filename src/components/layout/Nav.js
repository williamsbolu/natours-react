import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import styles from './Nav.module.css';
import logoWhite from '../../assets/logo-white.png';
import { NATOURS_API } from '../../lib/api';
import { useContext } from 'react';

const Header = () => {
    const authCtx = useContext(AuthContext);

    return (
        <nav className={styles.nav}>
            <li>
                <Link to="/">All tours</Link>
            </li>
            <div className={styles['header-logo']}>
                <img src={logoWhite} alt="Natours-logo white" />
            </div>
            <ul className={styles['nav--users']}>
                {!authCtx.userStatus.userIsLoggedIn && (
                    <li>
                        <Link to="/login">Log in</Link>
                    </li>
                )}
                {!authCtx.userStatus.userIsLoggedIn && (
                    <li>
                        <Link to="/sign-up" className={styles.cta}>
                            Sign up
                        </Link>
                    </li>
                )}

                {authCtx.userStatus.userIsLoggedIn && <Link to="/logout">Logout</Link>}
                {authCtx.userStatus.userIsLoggedIn && (
                    <Link to="/sign-up" className={styles['user-link']}>
                        <img
                            src={`${NATOURS_API}/img/users/${authCtx.userStatus.userPhoto}`}
                            alt={`img of ${authCtx.userStatus.userName}`}
                        />
                        <span>user</span>
                    </Link>
                )}
            </ul>
        </nav>
    );
};

export default Header;
