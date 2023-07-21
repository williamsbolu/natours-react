import styles from '../UI/LoadingSpinner.module.css';

const LoadingSpinner = () => {
    return <div className={styles['lds-dual-ring']}></div>;
};

export default LoadingSpinner;
