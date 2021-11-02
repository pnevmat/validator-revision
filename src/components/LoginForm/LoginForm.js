import React, {useState} from 'react';

import Validator from '../../utils/validator';

import styles from './loginForm.module.css';

const LoginForm = () => {
    const [emailChange, setEmailChange] = useState('');
    const [passwordChange, setPasswordChange] = useState('');

    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);

    const validationSchema = {
        length: 6,
        capitalLetters: /([A-Z])/g,
        numbers: /([0-9])/g,
        symbols: /\W/g
    };

    const errors = {
        email: 'Email is not valid',
        length: 'Statement should be at least 6 characters',
        symbols: 'Statement should contain at least 1 capital, 1 number and 1 symbol letter'
    };

    // const validator = new Validator(emailChange, validationSchema, errors);

    const handleChange = (e) => {
        const {name, value} = e.target;

        switch (name) {
            case 'email':
                setEmailChange(value);
                setEmailValidation(Validator.email(emailChange, validationSchema, errors));
                break;
            case 'password':
                setPasswordChange(value);
                setPasswordValidation(Validator.custom(passwordChange, validationSchema, errors));
                break;
            default:
                break;
        };
    };

    const handleSubmit = () => {

        if (emailChange !== '' && passwordChange !== '') {

            console.log('Submission started');
        };
    };

    return (
        <div className={styles.container}>
            <form
                className={styles.form}
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <h3 className={styles.title}>Login</h3>
                <label htmlFor="" name="login">
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        onChange={e => {
                            handleChange(e);
                        }}
                    />
                    {emailValidation && <p className={styles.errorMessage}>{emailValidation}</p>}
                </label>
                <label className={styles.inputLabel}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Пароль"
                        name="password"
                        onChange={e => {
                            handleChange(e);
                        }}
                    />
                    {passwordValidation && <p className={styles.errorMessage}>{passwordValidation}</p>}
                </label>
                <button className={styles.buttonSubmit}   type="submit">
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default LoginForm;