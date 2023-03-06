import React, { useState } from 'react';
import rnIcon from '../../assets/images/rn_icon_white.png';
import Auth from '../../utils/auth';

const AppNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // assuming the user is initially authenticated
  const handleLogout = () => {
    // TODO: how to implement the logout logic here? This is still incomplete
    Auth.logout();

    setIsAuthenticated(false); // update the auth status
  };
  return (
    <header className="d-flex flex-wrap justify-content-center">
      <section>
        <img
          src={rnIcon}
          className="headerImgAdj"
          alt="Logo that reads Reminder Nurse"
        />
      </section>
      {isAuthenticated && (
        <button
          className="logout-button btn btn-light btn-sm  "
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
    </header>
  );
};

export default AppNavbar;
