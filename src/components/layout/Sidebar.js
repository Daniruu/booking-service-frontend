import { React } from "react";
import './Sidebar.css'


const Sidebar = ({ selectedOption, setSelectedOption, user, logout }) => {

    const handleButtonClick = (option) => {
        setSelectedOption(option);
    }
    
    return (
        <div className="sidebar">
            <div className="container">
                <div className="user-card">
                    <img src="/avatar.jpg" alt="Avatar" className="avatar" />
                    <div className="user-card-info">
                        <div className="user-name semi-bolt">{user.firstName} {user.secondName}</div>
                        <div className="user-email light">{user.phoneNumber}</div>
                    </div>
                </div>
                <div className="user-buttons">
                    <button className={`option-button medium ${selectedOption === 'Personal' ? 'selected' : ''}`} onClick={() => handleButtonClick('Personal')}>Dane personalne</button>
                    <button className={`option-button medium ${selectedOption === 'Reservations' ? 'selected' : ''}`} onClick={() => handleButtonClick('Reservations')}>Rezerwacje</button>
                    <button className={`option-button medium ${selectedOption === 'Reviews' ? 'selected' : ''}`} onClick={() => handleButtonClick('Reviews')}>Opinie</button>
                    <button className={`option-button medium ${selectedOption === 'Payments' ? 'selected' : ''}`} onClick={() => handleButtonClick('Payments')}>Płatności</button>
                </div>

                <button className="add-business-button">
                    Załóź konto biznesowe
                </button>
                
                <button className="logout-button semi-bolt" onClick={logout}>
                    <img src="/logout.png" alt="Wyloguj" className="icon-left"/>
                    Wyloguj
                </button>
            </div>
        </div>
    );
}

export default Sidebar;


//dropdonw-arrow link
//<a href="https://www.flaticon.com/free-icons/down-arrow" title="down arrow icons">Down arrow icons created by Arkinasi - Flaticon</a>

//logout link
//<a href="https://www.flaticon.com/free-icons/logout" title="logout icons">Logout icons created by dmitri13 - Flaticon</a>