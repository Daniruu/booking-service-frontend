import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TextField } from '../../components/forms';
import PrimaryButton from '../../components/buttons/PrimaryButton/PrimaryButton';
import GoogleButton from '../../components/buttons/GoogleButton/GoogleButton';
import backIcon from '../../assets/images/back.png';
import './RegisterForm.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailMessage, setEmailMessge] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [firstNameMessage, setFirstNameMessage] = useState('')
    const [secondNameMessage, setSecondNameMessage] = useState('');
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const handleNextStep = (e) => {
        e.preventDefault();
        setEmailMessge('');
        setPasswordMessage('');
        setConfirmPasswordMessage('');

        if (!checkRequiredFields()) {
            return;
        }

        setStep(2);
    }

    const handlePrevStep = () => {
        setStep(1);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setFirstNameMessage('');
        setSecondNameMessage('');
        setPhoneNumberMessage('');

        if (!checkRequiredFields()) {
            return;
        }

        try {
            await register(email, password, firstName, secondName, phoneNumber);
            navigate('/login');
        } 
        catch (error) {
            console.error('Error:', error);
        }
    };

    const checkRequiredFields = () => {
        setEmail(email.trim());
        setPassword(password.trim());
        setConfirmPassword(confirmPassword.trim());
        setFirstName(firstName.trim());
        setSecondName(secondName.trim());
        setPhoneNumber(phoneNumber.trim());

        if (step === 1) {
            if (!validateEmail()) {
                return false;
            }
            if (!validatePassword()) {
                return false;
            }
        }
        else {
            if (!validateFirstName()) {
                return false;
            }
            if (!validateSecondName()) {
                return false;
            }
            if (!validatePhoneNumber()) {
                return false;
            }
        }
        
        return true;
    }

    const isNotEmpty = (string) => {
        return string.length > 0;
    }

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!isNotEmpty(email)) {
            setEmailMessge('Pole jest wymagane');
            return false;
        }

        if (!regex.test(email)) {
            setEmailMessge('Nie prawidłowy Email');
            return false;
        }

        return true;
    }

    const validatePassword = () => {
        const hasNoSpaces = !/\s/.test(password);
        const isLongEnough = password.length >= 6;
        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);

        if (!isNotEmpty(password)) {
            setPasswordMessage('Pole jest wymagane');
            return false;
        }

        if (!hasNoSpaces) {
            setPasswordMessage('hasło nie może zawierać spacji');
            return false;
        }

        if (!isLongEnough) {
            setPasswordMessage('Hasło musi składać się z minimum 6 znaków');
            return false;
        }

        if (!hasNumber) {
            setPasswordMessage('Hasło musi zawierać przynajmniej jedną cyfrę');
            return false;
        }
        
        if (!hasLetter) {
            setPasswordMessage('Hasło musi zawierać co najmniej jedną literę');
            return false;
        }

        if (confirmPassword !== password) {
            setConfirmPasswordMessage('Hasła muszą się zgadzać');
            return false;
        }
        return true;
    }

    const validateFirstName = () => {
        if(!isNotEmpty(firstName)) {
            setFirstNameMessage('Pole jest wymagane');
            return false;
        }
        return true;
    }

    const validateSecondName = () => {
        if(!isNotEmpty(secondName)) {
            setSecondNameMessage('Pole jest wymagane');
            return false;
        }
        return true;
    }

    const validatePhoneNumber = () => {
        const isLongEnough = phoneNumber.length === 9;
        const isOnlyNumbers = /^[0-9]+$/.test(phoneNumber);

        if(!isNotEmpty(phoneNumber)) {
            setPhoneNumberMessage('Pole jest wymagane');
            return false;
        }
        
        if(!isLongEnough) {
            setPhoneNumberMessage('Nie prawidłowy numer telefonu');
            return false;
        }

        if(!isOnlyNumbers) {
            setPhoneNumberMessage('Nie prawidłowy numer telefonu');
            return false;
        }
        return true;
    }

    return (
        <div className='register-form'>
            <h2>Rejestracja</h2>
            {(step === 1) && (
                <form className='form' onSubmit={handleNextStep} noValidate>
                    <TextField
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        errorMessage={emailMessage}
                    />
                    <TextField
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Hasło'
                        errorMessage={passwordMessage}
                    />
                    <TextField
                        type='password'
                        name='confirm-password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Powtórz hasło'
                        errorMessage={confirmPasswordMessage}
                    />

                    <PrimaryButton type='submit'>Dalej</PrimaryButton>
                </form>
            )}

            {(step === 2) && (
                <form className='form' onSubmit={handleRegister} noValidate>
                    <TextField
                        type='text'
                        name='first-name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='Imię'
                        errorMessage={firstNameMessage}
                    />
                    <TextField
                        type='text'
                        name='second-name'
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)}
                        placeholder='Nazwisko'
                        errorMessage={secondNameMessage}
                    />
                    <TextField
                        type='phone'
                        name='phone'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder='Telefon'
                        errorMessage={phoneNumberMessage}
                    />
                    <PrimaryButton type='submit'>Zarejestruj się</PrimaryButton>
                    <button className='back-button' onClick={handlePrevStep}>
                        <img src={backIcon} alt='Powrót' />
                    </button>
                </form>
            )}

            <span style={{ fontSize: '14px' }}>Masz już konto? <a href='/login'>Zaloguj się</a> </span>

            <span className='or'>Lub</span>

            <GoogleButton>Kontynuuj z Google</GoogleButton>
        </div>
    );
};

export default RegisterForm;

// back icon
// <a href="https://www.flaticon.com/free-icons/back-arrow" title="back arrow icons">Back arrow icons created by Ilham Fitrotul Hayat - Flaticon</a>