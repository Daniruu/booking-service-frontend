import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './UserSidebar.css';
import userIcon from '../../../assets/images/user.png';
import logoutIcon from '../../../assets/images/logout.png';
import calendarIcon from '../../../assets/images/booking.png';
import heartIcon from '../../../assets/images//heart.png';
import businessIcon from '../../../assets/images/briefcase.png';
import SelectionButton from '../../../components/buttons/SelectionButton/SelectionButton';

const UserSidebar = ({ selectedOption, setSelectedOption, businessExists }) => {
    const { logout } = useContext(AuthContext);

    return (
        <div className='user-sidebar'>
            <div className='user-buttons'>
                <h4>PROFIL</h4>
                <SelectionButton 
                    onClick={(e) => setSelectedOption('Data')} 
                    isSelected={selectedOption === 'Data'} 
                    icon={userIcon}>
                        Dane personalne
                </SelectionButton>
                <SelectionButton 
                    onClick={(e) => setSelectedOption('Reservations')} 
                    isSelected={selectedOption === 'Reservations'} 
                    icon={calendarIcon}>
                        Rezerwacje
                </SelectionButton>
                <SelectionButton 
                    onClick={(e) => setSelectedOption('Favourite')} 
                    isSelected={selectedOption === 'Favourite'} 
                    icon={heartIcon}>
                        Ulubione
                </SelectionButton>

                <hr className='divider' />

                <h4>AKCJE</h4>

                {businessExists ? (
                    <Link to='/business' className='link-button'>
                        <SelectionButton icon={businessIcon}>Konto biznesowe</SelectionButton>
                    </Link>
                ):(
                    <Link to='/add-business' className='link-button'>
                        <SelectionButton icon={businessIcon}>Dodaj swój biznes</SelectionButton>
                    </Link>
                )}
            </div>

            <div className='logout-button'>
                <SelectionButton onClick={logout} icon={logoutIcon}>Wyloguj</SelectionButton>
            </div>
        </div>
    );
}

export default UserSidebar;