import { Fragment, useState, useRef, useEffect, useCallback, useContext } from 'react';
import AuthContext from '../../store/auth-context';
// import useHttp from '../../hooks/use-http';

import styles from './UserSettings.module.css';
import axios from 'axios';
import { NATOURS_API } from '../../lib/api';
import LoginSpinnerDark from '../UI/LoginSpinnerDark';

const UserSettings = (props) => {
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const photoInputRef = useRef();
    const CurrentPasswordInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();

    // For local storage auth functionality
    const getUserData = useCallback(async () => {
        try {
            const res = await axios.get(`${NATOURS_API}/api/v1/users/me`, {
                headers: {
                    Authorization: `Bearer ${authCtx.token}`,
                },
            });

            console.log(res);
            setUser(res.data.data.data);
        } catch (err) {
            console.log(err);
            // if the request was rejected by d server, the we output the server response message
            if (!err.response) {
                setError('Something went wrong. Try again later.');
            } else if (err.response.status === 401) {
                setError(err.response.data.message);
            } else {
                setError('Could not connect to the server. Try again later.');
            }
        }
        setIsLoading(false);
    }, [authCtx.token]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    // const { sendRequest, status, data: user, error } = useHttp(getUserData, true);

    // useEffect(() => {
    //     sendRequest();
    // }, [sendRequest]);

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
        const enteredPhotoFile = photoInputRef.current.files[0];

        // confirm validity
        const enteredNameIsValid = enteredName.length >= 5;
        const enteredEmailIsValid = enteredEmail.includes('@');

        setUpdateFormIsValid({
            enteredNameIsValid,
            enteredEmailIsValid,
        });

        if (!enteredNameIsValid && !enteredEmailIsValid) return;

        const form = new FormData();
        form.append('name', enteredName);
        form.append('email', enteredEmail);
        form.append('photo', enteredPhotoFile);

        // prevent sending multiple request
        if (props.updateIsLoading) return;

        // update the user
        props.onUpdateUser(form);
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

        // prevent sending multiple request
        if (props.passwordChangeIsLoading) return;

        // change the password
        props.onChangePassword({
            passwordCurrent: enteredCurrentPassword,
            password: enteredPassword,
            passwordConfirm: enteredPasswordConfirm,
        });
    };

    // if (status === 'pending') {// for httpOnly
    if (isLoading) {
        return (
            <div className="centered">
                <LoginSpinnerDark />
            </div>
        );
    }

    if (error) {
        return (
            <div className="centered">
                <p>{error}</p>
            </div>
        );
    }

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
                            defaultValue={user.name}
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
                            defaultValue={user.email}
                            ref={emailInputRef}
                        />
                        {!updateFormIsValid.enteredEmailIsValid && (
                            <p className="text-invalid">
                                Please enter a valid email address.
                            </p>
                        )}
                    </div>
                    <div className="form__group form__photo-upload">
                        <img
                            className="form__user-photo"
                            src={`${NATOURS_API}/img/users/${user.photo}`}
                            alt={user.photo}
                        />
                        <input
                            className="form__upload"
                            type="file"
                            accept="image/*"
                            id="photo"
                            ref={photoInputRef}
                        />
                        <label htmlFor="photo">Choose new photo </label>
                    </div>
                    <div className="form__group right">
                        <button className="btn btn--small btn--green">
                            {!props.updateIsLoading ? 'Save settings' : 'Please wait...'}
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
                            {!props.passwordChangeIsLoading
                                ? 'Save password'
                                : 'Updating...'}
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default UserSettings;
