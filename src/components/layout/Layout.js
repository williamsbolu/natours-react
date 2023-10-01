import { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';

import styles from './Layout.module.css';
import Notification from '../UI/Notification';
import Nav from '../layout/Nav';
import SideMenu from '../UI/SideMenu';
import Footer from './Footer';

let isLoaded = true;

const Layout = (props) => {
    const authCtx = useContext(AuthContext);
    const [menuIsEnabled, setMenuIsEnabled] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            isLoaded = false;
            return;
        }

        const timer = setTimeout(() => {
            authCtx.setNotification(null);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [authCtx]);

    const menuDisplayHandler = () => {
        setMenuIsEnabled((prevState) => !prevState);
    };

    return (
        <Fragment>
            {authCtx.notification && (
                <Notification
                    status={authCtx.notification.status}
                    message={authCtx.notification.message}
                />
            )}
            <SideMenu menuIsEnabled={menuIsEnabled} onShowMenu={menuDisplayHandler} />
            <header className={styles.header}>
                <Nav onShowMenu={menuDisplayHandler} />
            </header>
            <main>{props.children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout;
