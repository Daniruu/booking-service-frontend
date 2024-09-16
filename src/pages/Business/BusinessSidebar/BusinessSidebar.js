import React, { useContext} from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import SelectionButton from '../../../components/buttons/SelectionButton/SelectionButton';
import './BusinessSidebar.css';
import groupIcon from '../../../assets/images/group.png';
import calendarIcon from '../../../assets/images/booking.png';
import serviceIcon from '../../../assets/images/customer-service.png';
import dashboardIcon from '../../../assets/images/dashboard.png';
import logoutIcon from '../../../assets/images/logout.png';
import userIcon from '../../../assets/images/user.png';

const BusinessSidebar = ({ selectedOption, setSelectedOption }) => {
    const { logout } = useContext(AuthContext);

    return (
        <div className='business-sidebar'>
            <div className='business-buttons'>
                <h4>PRZEDSIĘBIORSTWO</h4>
                <SelectionButton onClick={(e) => setSelectedOption('Dashboard')} isSelected={selectedOption === 'Dashboard'} icon={dashboardIcon}>Pulpit</SelectionButton>
                <SelectionButton onClick={(e) => setSelectedOption('Employees')} isSelected={selectedOption === 'Employees'} icon={groupIcon}>Pracownicy</SelectionButton>
                <SelectionButton onClick={(e) => setSelectedOption('Services')} isSelected={selectedOption === 'Services'} icon={serviceIcon}>Usługi</SelectionButton>
                <SelectionButton onClick={(e) => setSelectedOption('Calendar')} isSelected={selectedOption === 'Calendar'} icon={calendarIcon}>Kalendarz</SelectionButton>

                <hr className='divider' />

                <h4>AKCJE</h4>
                <Link to='/user' className='link-button'>
                    <SelectionButton icon={userIcon}>Konto użytkownika</SelectionButton>
                </Link>
            </div>
            <div className='logout-button'>
                <SelectionButton onClick={logout} icon={logoutIcon}>Wyloguj</SelectionButton>
            </div>
        </div>
    );
}

export default BusinessSidebar;