import React, {useState} from 'react';

import validator from '../../utils/validator';

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
    const [nameValidation, setNameValidation] = useState(false);

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
                emailChange = value;
                // setEmailChange(value);
                setEmailValidation(validator(emailChange, {
                    length: 6,
                    errors: {
                        email: 'Email is not valid', 
                        length: 'Statement length should be 6 characters'
                    }
                }, {email: true, exactLength: true}));
                break;
            case 'name':
                nameChange = value;
                // setNameChange(value);
                setNameValidation(validator(nameChange, {
                    length: {min: 6, max: 12}, 
                    custom: {capitalLetters: /([A-Z])/g},
                    errors: {
                        length: {
                            min: `Statement should be at least 6 characters`, 
                            max: 'Statement should be not longer than 8 characters'
                        },
                        symbols: 'Statement should contain at least 1 capital letter'
                    }
                }, {minMax: true, custom: true}))
                break;
            case 'password':
                passwordChange = value;
                // setPasswordChange(value);
                setPasswordValidation(validator(passwordChange, validationSchema, {minMax: true, custom: true}));
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
                    {nameValidation && <p className={styles.errorMessage}>{nameValidation}</p>}
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