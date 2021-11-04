import React, {useState} from 'react';

import Validator from '../../utils/validator';

import styles from './registrationForm.module.css';

const RegistrationForm = () => {
    // const [emailChange, setEmailChange] = useState('');
    // const [nameChange, setNameChange] = useState('');
    // const [passwordChange, setPasswordChange] = useState('');

    let emailChange = '';
    let nameChange = '';
    let passwordChange = '';

    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);

    const validationSchema = {
        length: {min: 10, max: false},
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
                min: 'Statement should be at least 6 characters', 
                max: 'Statement should be not longer than 8 characters'
            },
            // 'Statement length should be 6 characters',
            symbols: 'Statement should contain at least 1 capital, 1 number and 1 symbol letter'
        }
    };

    const validation = {
        // email: true,
        // exactLength: true,
        minMax: true,
        custom: true
    }

    // const validator = new Validator(passwordChange, validationSchema, errors)

    const handleChange = (e) => {
        const {name, value} = e.target;

        switch (name) {
            case 'email':
                emailChange = value;
                // setEmailChange(value);
                setEmailValidation(Validator(emailChange, validationSchema, validation));
                break;
            case 'name':
                nameChange = value;
                // setNameChange(value);
                break;
            case 'password':
                passwordChange = value;
                // setPasswordChange(value);
                setPasswordValidation(Validator(passwordChange, validationSchema, validation));
                console.log('Password validation: ', passwordValidation);
                break;
            default:
                break;
        };
    };



    const handleSubmit = () => {

        if (emailChange !== '' && nameChange !== '' && passwordChange !== '') {

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
                <h3 className={styles.title}>Sign up</h3>
                <label className={styles.label} htmlFor="" name="register">
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
                <label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={e => {
                            handleChange(e);
                        }}
                    />
                </label>
                <label className={styles.inputLabel}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Password"
                        name="password"
                        onChange={e => {
                            handleChange(e);
                        }}
                    />
                    {passwordValidation && <p className={styles.errorMessage}>{passwordValidation}</p>}
                </label>
                <button className={styles.buttonSubmit} type="submit">
                    Log in
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;