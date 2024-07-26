import React from "react";
import { useState } from "react";
import './RegisterForm.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        if (email === '') {
            setErrorMessage("Podaj adres Email");
            return;
        }
        if (!email.includes('@')) {
            setErrorMessage("Wprowadź poprawny adres Email")
            return;
        }
        if (password === '') {
            setErrorMessage("Wpisz hasło");
            return;
        }
        if (confirmPassword === '') {
            setErrorMessage("Potwierdź hasło");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Hasła muszą się zgadzać");
            return;
        }

        try {
          const response = await fetch('https://localhost:7087/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
    
          if (response.ok) {
            const successMessage = await response.text();
            setErrorMessage(successMessage);
            document.getElementById("error-message").style.color = "green";
          } 
          else {
            const errorMessage = await response.text();
            setErrorMessage(errorMessage);
          }
        } 
        catch (error) {
          console.error('Error:', error);
          alert('Wystąpił bład, proszę spróbować jeszcze raz.');
        }
    };

    return (
        <div className="register-form">
            <h2>Rejestracja</h2>
            <div className="form-element">
                <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-element">
                <input className="input" type="password" placeholder="Wpisz hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-element">
                <input className="input" type="password" placeholder="Potwierdź hasło" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <span id="error-message" style={{ fontSize: '14px', color: 'red' }}>{errorMessage}</span>
            <div className="form-element">
                <button className="submit-button" onClick={handleRegister}>Zarejestruj się</button>
            </div>
            <span style={{ marginBottom: '20px', fontSize: '14px'}}>Masz już konto? <a href="/login">Zaloguj się</a> </span>
            <div className="form-element">
                <span className="or">Lub</span>
            </div>
            <div className="form-element">
                <button className="google-button">Kontynuuj z Google</button>
            </div>
        </div>
    );
};

export default RegisterForm;