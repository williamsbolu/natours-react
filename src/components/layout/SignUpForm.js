import { useRef, useState } from 'react';
import styles from './LoginForm.module.css';

import LoginSpinner from '../UI/LoginSpinner';

const SignUpForm = (props) => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();

    const [formIsValid, setFormIsValid] = useState({
        enteredNameIsValid: true,
        enteredEmailIsValid: true,
        enteredPasswordIsValid: true,
        enteredPasswordConfirmIsValid: true,
    });

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredPasswordConfirm = passwordConfirmInputRef.current.value;

        const enteredNameIsValid = enteredName.length >= 5;
        const enteredEmailIsValid = enteredEmail.includes('@');
        const enteredPasswordIsValid = enteredPassword.length >= 8;
        const enteredPasswordConfirmIsValid = enteredPasswordConfirm.length >= 8;

        setFormIsValid({
            enteredNameIsValid,
            enteredEmailIsValid,
            enteredPasswordIsValid,
            enteredPasswordConfirmIsValid,
        });

        // if all the 4 fields are valid
        const formContentIsValid =
            enteredNameIsValid &&
            enteredEmailIsValid &&
            enteredPasswordIsValid &&
            enteredPasswordConfirmIsValid;

        // if the content or one of the content is invalid
        if (!formContentIsValid) return;

        // submit the form
        props.onSignUp({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
            passwordConfirm: enteredPasswordConfirm,
        });
    };

    // Input styles
    const nameInputClasses = `${styles['form__input']} ${
        !formIsValid.enteredNameIsValid ? styles['invalid'] : ''
    }`;
    const emailInputClasses = `${styles['form__input']} ${
        !formIsValid.enteredEmailIsValid ? styles['invalid'] : ''
    }`;
    const passwordInputClasses = `${styles['form__input']} ${
        !formIsValid.enteredPasswordIsValid ? styles['invalid'] : ''
    }`;
    const passwordConfirmInputClasses = `${styles['form__input']} ${
        !formIsValid.enteredPasswordConfirmIsValid ? styles['invalid'] : ''
    }`;

    return (
        <section className={styles['login-form']}>
            <h2 className="heading-secondary ma-bt-lg">Sign up To Natours</h2>
            <form className={styles['form form--login']} onSubmit={submitHandler}>
                <div className={styles['form__group']}>
                    <label className={styles['form__label']} htmlFor="name">
                        Name
                    </label>
                    <input
                        className={nameInputClasses}
                        id="name"
                        type="text"
                        placeholder="your name"
                        ref={nameInputRef}
                    />
                    {!formIsValid.enteredNameIsValid && (
                        <p>Your name must be at least 5 characters.</p>
                    )}
                </div>
                <div className={styles['form__group']}>
                    <label className={styles['form__label']} htmlFor="email">
                        Email Address
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
                        <p>Password must be at least 8 characters.</p>
                    )}
                </div>
                <div className={`${styles['form__group']} ${styles['ma-bt-md']}`}>
                    <label className={styles['form__label']} htmlFor="passwordConfirm">
                        Confirm Password
                    </label>
                    <input
                        className={passwordConfirmInputClasses}
                        id="passwordConfirm"
                        type="password"
                        placeholder="••••••••"
                        ref={passwordConfirmInputRef}
                    />
                    {!formIsValid.enteredPasswordConfirmIsValid && (
                        <p>Password must be at least 8 characters.</p>
                    )}
                </div>
                <div className={styles['form__group']}>
                    <button
                        className={`${styles['btn']} ${
                            props.isLoading ? styles['btn--loader'] : ''
                        }`}
                    >
                        Sign Up {props.isLoading && <LoginSpinner />}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SignUpForm;
