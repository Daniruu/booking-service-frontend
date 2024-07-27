import React from "react";
import { useState } from "react";

import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await fetch('https://localhost:7087/auth/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Token:', data.token);
            setMessage('Logowanie zakończone powodzeniem!')
            

        } catch (error) {
            setError('Nie prawidłowe hasło lub email');
        }
    }

    return (
        <div className="login-form">
            <h2>Logowanie</h2>
            <form className="form" onSubmit={handleLogin}>
                <div className="form-element">
                    <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-element">
                    <input className="input" type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <a style={{ marginBottom: '20px'}} href='/login'>Nie pamiętasz hasła?</a>

                {error && <div style={{ color: 'red' }}>{error}</div>}
                {message && <div style={{ color: 'green' }}>{message}</div>}

                <div className="form-element">
                    <button className="submit-button" type="submit">Zaloguj się</button>
                </div>
            </form>
            <span style={{ marginBottom: '20px', fontSize: '14px'}}>Nie masz konta? <a href="/register">Zarejestruj się</a> </span>

            <div className="form-element">
                <span className="or">Lub</span>
            </div>

            <div className="form-element">
                <button className="google-button">Kontynuuj z Google</button>
            </div>
        </div>
    );
};

export default LoginForm;