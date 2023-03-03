import React, { useState } from 'react';
import rnIcon from '../../assets/rn_icon_white.png';
import Auth from '../../utils/auth';

const AppNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // assuming the user is initially authenticated
  const handleLogout = () => {
    // TODO: how to implement the logout logic here? This is still incomplete
    Auth.logout();

    setIsAuthenticated(false); // update the auth status
  };
  return (
    <header>
      <img
        src={rnIcon}
        className="headerImgAdj"
        alt="Logo that reads Reminder Nurse"
      />
      {isAuthenticated && (
        <button className="btn btn-outline-primary" onClick={handleLogout}>
          Log out
        </button>
      )}
    </header>
  );
};

export default AppNavbar;
