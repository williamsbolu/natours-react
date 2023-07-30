import styles from './LoginSpinnerDark.module.css';

const LoginSpinner = () => {
    return (
        <div className={styles['lds-ring']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default LoginSpinner;
