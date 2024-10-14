import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ resetHeader }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('activeLink'); // Clear the active link

    // Call resetHeader to update the header state
    resetHeader();

    // Redirect to login or home page
    navigate('/login'); // Change this to your desired route
  };

  return (
    <button onClick={handleLogout} className="header__logout">
      Log Out
    </button>
  );
};

export default LogoutButton;
