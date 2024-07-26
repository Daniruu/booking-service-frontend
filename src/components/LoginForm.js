import React from "react";
import { useState } from "react";
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-form">
            <h2>Logowanie</h2>
            <div className="form-element">
                <input className="input" type="email" placeholder="Email" />
            </div>
            <div className="form-element">
                <input className="input" type="password" placeholder="Hasło" />
            </div>
            <a style={{ marginBottom: '20px'}} href='/login'>Nie pamiętasz hasła?</a>
            <div className="form-element">
                <button className="submit-button">Zaloguj się</button>
            </div>
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