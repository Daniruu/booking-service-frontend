import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="wrap">
                <div className="header-content">
                    <div className="logo">
                        <a href='/'>
                            <span className="logo-left">BookIt</span>
                            <span className="logo-rigth">Easy</span>
                        </a>
                    </div>
                    <div className="content">
                        <a href='/login'>Załoguj się / Zarejestruj się</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;