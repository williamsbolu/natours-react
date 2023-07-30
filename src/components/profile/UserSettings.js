import { Fragment, useState, useRef } from 'react';

import styles from './UserSettings.module.css';
import user1 from '../../assets/user-1.jpg';

const UserSettings = () => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const CurrentPasswordInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();

    const [updateFormIsValid, setUpdateFormIsValid] = useState({
        enteredNameIsValid: true,
        enteredEmailIsValid: true,
    });

    const [passwordFormIsValid, setPasswordFormIsValid] = useState({
        enteredCurrentPasswordIsValid: true,
        enteredPasswordIsValid: true,
        enteredPasswordConfirmIsValid: true,
    });

    const updateFormHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;

        // confirm validity
        const enteredNameIsValid = enteredName.length >= 5;
        const enteredEmailIsValid = enteredEmail.includes('@');

        setUpdateFormIsValid({
            enteredNameIsValid,
            enteredEmailIsValid,
        });

        if (!enteredNameIsValid && !enteredEmailIsValid) return;

        // update the user
        // props.onUpdateUser()
    };

    const changePasswordHandler = (e) => {
        e.preventDefault();

        const enteredCurrentPassword = CurrentPasswordInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredPasswordConfirm = passwordConfirmInputRef.current.value;

        // confirm validity
        const enteredCurrentPasswordIsValid = enteredCurrentPassword.length >= 8;
        const enteredPasswordIsValid = enteredPassword.length >= 8;
        const enteredPasswordConfirmIsValid = enteredPasswordConfirm.length >= 8;

        setPasswordFormIsValid({
            enteredCurrentPasswordIsValid,
            enteredPasswordIsValid,
            enteredPasswordConfirmIsValid,
        });

        const formContentIsValid =
            enteredCurrentPasswordIsValid &&
            enteredPasswordIsValid &&
            enteredPasswordConfirmIsValid;

        if (!formContentIsValid) return;

        // change the password
        // props.onChangePassword()
    };

    return (
        <Fragment>
            <div className={styles['user-view__form-container']}>
                <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
                <form className="form" onSubmit={updateFormHandler}>
                    <div className="form__group">
                        <label className="form__label" htmlFor="name">
                            Name
                        </label>
                        <input
                            className={`form__input ${
                                !updateFormIsValid.enteredNameIsValid ? 'invalid' : ''
                            }`}
                            id="name"
                            type="text"
                            defaultValue="bolu"
                            ref={nameInputRef}
                        />
                        {!updateFormIsValid.enteredNameIsValid && (
                            <p className="text-invalid">
                                Your name must be at least 5 characters.
                            </p>
                        )}
                    </div>
                    <div className="form__group ma-bt-md">
                        <label className="form__label" htmlFor="email">
                            Email address
                        </label>
                        <input
                            className={`form__input ${
                                !updateFormIsValid.enteredEmailIsValid ? 'invalid' : ''
                            }`}
                            id="email"
                            type="email"
                            defaultValue="williams@"
                            ref={emailInputRef}
                        />
                        {!updateFormIsValid.enteredEmailIsValid && (
                            <p className="text-invalid">
                                Please enter a valid email address.
                            </p>
                        )}
                    </div>
                    <div className="form__group form__photo-upload">
                        <img className="form__user-photo" src={user1} alt="user" />
                        <input
                            className="form__upload"
                            type="file"
                            accept="image/*"
                            id="photo"
                        />
                        <label htmlFor="photo">Choose new photo </label>
                    </div>
                    <div className="form__group right">
                        <button className="btn btn--small btn--green">
                            Save settings
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.line}>&nbsp;</div>
            <div className={styles['user-view__form-container']}>
                <h2 className="heading-secondary ma-bt-md">Password change</h2>
                <form className="form" onSubmit={changePasswordHandler}>
                    <div className="form__group">
                        <label className="form__label" htmlFor="password-current">
                            Current password
                        </label>
                        <input
                            className={`form__input ${
                                !passwordFormIsValid.enteredCurrentPasswordIsValid
                                    ? 'invalid'
                                    : ''
                            }`}
                            id="password-current"
                            type="password"
                            placeholder="••••••••"
                            ref={CurrentPasswordInputRef}
                        />
                        {!passwordFormIsValid.enteredCurrentPasswordIsValid && (
                            <p className="text-invalid">
                                Password must be at least 8 characters.
                            </p>
                        )}
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="password">
                            New password
                        </label>
                        <input
                            className={`form__input ${
                                !passwordFormIsValid.enteredPasswordIsValid
                                    ? 'invalid'
                                    : ''
                            }`}
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            ref={passwordInputRef}
                        />
                        {!passwordFormIsValid.enteredPasswordIsValid && (
                            <p className="text-invalid">
                                Password must be at least 8 characters.
                            </p>
                        )}
                    </div>
                    <div className="form__group ma-bt-lg">
                        <label className="form__label" htmlFor="password-confirm">
                            Confirm password
                        </label>
                        <input
                            className={`form__input ${
                                !passwordFormIsValid.enteredPasswordConfirmIsValid
                                    ? 'invalid'
                                    : ''
                            }`}
                            id="password-confirm"
                            type="password"
                            placeholder="••••••••"
                            ref={passwordConfirmInputRef}
                        />
                        {!passwordFormIsValid.enteredPasswordConfirmIsValid && (
                            <p className="text-invalid">
                                Password must be at least 8 characters.
                            </p>
                        )}
                    </div>
                    <div className="form__group right">
                        <button className="btn btn--small btn--green">
                            Save password
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default UserSettings;