import classes from './Notification.module.css';

const Notification = (props) => {
    let specialClasses;

    if (props.status === 'error') {
        specialClasses = `${classes.notification} ${classes.error}`;
    }

    if (props.status === 'complete') {
        specialClasses = `${classes.notification} ${classes.success}`;
    }

    const stylesClass = `${classes.notification} ${specialClasses}`;

    return (
        <aside className={stylesClass}>
            <div className={classes['cart-detail-box']}>
                <p>{props.message}</p>
            </div>
        </aside>
    );
};

export default Notification;
