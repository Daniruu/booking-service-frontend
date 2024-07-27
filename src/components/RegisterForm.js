import React from "react";
import { useState } from "react";
import './RegisterForm.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if(!checkData()) {
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
                alert(successMessage);
            } 
            else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } 
        catch (error) {
            console.error('Error:', error);
            alert('Wystąpił bład, proszę spróbować jeszcze raz.');
        }
    };

    function checkData() {
        if (email === '') {
            setError("Email nie może być pustym");
            return false;
        }
        if (!email.includes('@')) {
            setError("Wpisz poprawny email");
            return false;
        }
        if (password === '') {
            setError("Podaj hasło");
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

    return (
        
        <div id="register-form" className="register-form">
            <h2>Rejestracja</h2>
            
            <form className="form" onSubmit={handleRegister}>
                <div className="form-element">
                    <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-element">
                    <input className="input" type="password" placeholder="Wpisz hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="form-element">
                    <input className="input" type="password" placeholder="Potwierdź hasło" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                {error && <div style={{ color: 'red' }}>{error}</div>}
                {message && <div style={{ color: 'green' }}>{message}</div>}

                <div className="form-element">
                    <button className="submit-button" type="submit">Zarejestruj się</button>
                </div>
            </form>

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