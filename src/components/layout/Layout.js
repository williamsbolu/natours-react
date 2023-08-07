import { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';

import styles from './Layout.module.css';
import Notification from '../UI/Notification';
import Nav from '../layout/Nav';
import Footer from './Footer';

let isLoaded = true;

const Layout = (props) => {
    const authCtx = useContext(AuthContext);

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

    return (
        <Fragment>
            {authCtx.notification && (
                <Notification
                    status={authCtx.notification.status}
                    message={authCtx.notification.message}
                />
            )}
            <header className={styles.header}>
                <Nav />
            </header>
            <main>{props.children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout;
