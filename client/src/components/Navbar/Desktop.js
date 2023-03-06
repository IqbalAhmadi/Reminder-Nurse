import React, { useState } from 'react';
import Auth from '../../utils/auth';

const DesktopNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // assuming the user is initially authenticated
  const handleLogout = () => {
    // TODO: how to implement the logout logic here? This is still incomplete
    Auth.logout();

    setIsAuthenticated(false); // update the auth status
  };
  return (
    <div className='hideMobile navAlignR'>
      {isAuthenticated && (
      <ul className="d-flex flex-wrap justify-content-center navContent">
        <li>
          <a href="/">
            Home
          </a>
        </li>
        <li>
          <a href="/medicines">
            Your Medications
          </a>
        </li>
        <a
          onClick={handleLogout}
        >
          Logout
        </a>
      </ul>
      )}
    </div>
  );
};

export default DesktopNavbar;
