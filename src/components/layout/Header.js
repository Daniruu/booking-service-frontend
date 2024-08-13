import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';


const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='header'>
            <div className='container'>
                <div className='header-content'>
                    <div className='logo'>
                        <Link to='/'>
                            <span className='logo-left'>BookIt</span>
                            <span className='logo-right'>Easy</span>
                        </Link>
                    </div>
                    <div className='header-item'>
                        {user ? (
                            <Link to='/user'>{user.firstName}</Link>
                        ) : (
                            <Link to='/login'>Załoguj się / Zarejestruj się</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;