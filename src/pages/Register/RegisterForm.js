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
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const stepQuantity = 2;
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const handleNextStep = () => {
        if(!CheckEmail()) {
            return;
        }

        if(!CheckPassword()) {
            return;
        }
        if (step < stepQuantity) {
            setStep(step + 1);
        }
    }

    const handlePrevStep = () => {
        if (step > 1 ) {
            setStep(step - 1);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if(!CheckUserName()) {
            return;
        }

        if(!CheckPhoneNumber()) {
            return;
        }

        try {
            await register(email, password, firstName, secondName, phoneNumber);
            navigate('/login');
        } 
        catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    function CheckEmail() {
        const regex = /\s/;

        if (email === '') {
            setError("Email nie może być pustym");
            return false;
        }
        if (!email.includes('@')) {
            setError("Wpisz poprawny email");
            return false;
        }
        if (regex.test(email)) {
            setError("Email nie może zawierać spacji");
            return false;
        }

        return true;
    };

    function CheckPassword() {
        const regex = /\s/;

        if (password === '') {
            setError("Podaj hasło");
            return false;
        }
        if (password.length < 6) {
            setError("Hasło musi mieć co najmniej 6 znaków");
            return false;
        }
        if (regex.test(password)) {
            setError("Hasło nie może zawierać spacji");
            return false;
        }
        if (confirmPassword === '') {
            setError("Powtórz hasło może być pustym");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Hasła muszą się zgadzać");
            return false;
        }

        return true;
    };

    function CheckUserName() {
        const regex = /\s/;

        if (firstName === '') {
            setError("Podaj nazwę użytkownika");
            return false;
        }
        if (regex.test(firstName)) {
            setError("Nazwa użytkownika nie może zawierać spacji");
            return false;
        }
        return true;
    };

    function CheckPhoneNumber() {
        const regex = /^\d+$/;
        
        if (!regex.test(phoneNumber)) {
            setError("Podaj prawidłowy numer telefonu");
            return false;
        }

        if (phoneNumber.length < 9) {
            setError("Podaj prawidłowy numer telefonu");
            return false;
        }
        return true;
    };
    
    return (
        <div className='register-form'>
            <h2>Rejestracja</h2>
            {(step === 1) && (
                <form className='form' onSubmit={handleNextStep}>
                    <TextField
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                    <TextField
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Hasło'
                    />
                    <TextField
                        type='password'
                        name='confirm-password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Powtórz hasło'
                    />

                    <PrimaryButton type='submit'>Dalej</PrimaryButton>
                </form>
            )}

            {(step === 2) && (
                <form className='form' onSubmit={handleRegister}>
                    <TextField
                        type='text'
                        name='first-name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='Imię'
                    />
                    <TextField
                        type='text'
                        name='second-name'
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)}
                        placeholder='Nazwisko'
                    />
                    <TextField
                        type='phone'
                        name='phone'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder='Telefon'
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