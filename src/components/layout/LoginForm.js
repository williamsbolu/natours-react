import { useRef, useState } from 'react';
import styles from './LoginForm.module.css';

import LoginSpinner from '../UI/LoginSpinner';

const LoginForm = (props) => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [formIsValid, setFormIsValid] = useState({
        enteredEmailIsValid: true,
        enteredPasswordIsValid: true,
    });

    const formSubmissionHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const enteredEmailIsValid = enteredEmail.includes('@');
        const enteredPasswordIsValid = enteredPassword.length >= 8;

        setFormIsValid({
            enteredEmailIsValid,
            enteredPasswordIsValid,
        });

        // if all the input fields are valid, we send d request to login the user
        if (enteredEmailIsValid && enteredPasswordIsValid) {
            props.onLogin({
                email: enteredEmail,
                password: enteredPassword,
            });
        }
    };

    const emailInputClasses = `${styles['form__input']} ${
        !formIsValid.enteredEmailIsValid ? styles['invalid'] : ''
    }`;
    const passwordInputClasses = `${styles['form__input']} ${
        !formIsValid.enteredPasswordIsValid ? styles['invalid'] : ''
    }`;

    return (
        <section className={styles['login-form']}>
            <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
            <form className={styles['form form--login']} onSubmit={formSubmissionHandler}>
                <div className={styles['form__group']}>
                    <label className={styles['form__label']} htmlFor="email">
                        Email address
                    </label>
                    <input
                        className={emailInputClasses}
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        ref={emailInputRef}
                    />
                    {!formIsValid.enteredEmailIsValid && (
                        <p>Please enter a valid email address.</p>
                    )}
                </div>
                <div className={`${styles['form__group']} ${styles['ma-bt-md']}`}>
                    <label className={styles['form__label']} htmlFor="password">
                        Password
                    </label>
                    <input
                        className={passwordInputClasses}
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        ref={passwordInputRef}
                    />
                    {!formIsValid.enteredPasswordIsValid && (
                        <p>Password must not be less than 8 characters.</p>
                    )}
                </div>
                <div className={styles['form__group']}>
                    <button
                        className={`${styles['btn']} ${
                            props.isLoading ? styles['btn--loader'] : ''
                        }`}
                    >
                        Login
                        {props.isLoading && <LoginSpinner />}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default LoginForm;
