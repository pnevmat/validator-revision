import React, {useState} from 'react';

import validator from '../../utils/validator';

import styles from './loginForm.module.css';

const LoginForm = () => {
    const [emailChange, setEmailChange] = useState('');
    const [passwordChange, setPasswordChange] = useState('');

    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);

    const validationSchema = {
        length: {min: 6, max: false},
        // 6,
        custom: {
            capitalLetters: /([A-Z])/g,
            numbers: /([0-9])/g,
            symbols: /\W/g
        },
        // /([A-Z])/g,
        errors: {
            email: 'Email is not valid',
            length: {
                min: `Statement should be at least 6 characters`, 
                max: 'Statement should be not longer than 8 characters'
            },
            // 'Statement length should be 6 characters',
            symbols: 'Statement should contain at least 1 capital, 1 number and 1 symbol letter'
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        switch (name) {
            case 'email':
                setEmailChange(value);
                setEmailValidation(validator(emailChange, validationSchema, {email: true}));
                break;
            case 'password':
                setPasswordChange(value);
                setPasswordValidation(validator(passwordChange, validationSchema, {custom: true}));
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