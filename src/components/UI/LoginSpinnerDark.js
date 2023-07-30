import styles from './LoginSpinnerDark.module.css';

const LoginSpinner = () => {
    return <div className={`${styles.sp} ${styles['sp-circle']}`}></div>;
};

export default LoginSpinner;
