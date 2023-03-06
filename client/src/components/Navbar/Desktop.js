import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(Auth.loggedIn());

  const logoutUser = () => {
    Auth.logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className='hideMobile navAlignR'>
      {isAuthenticated ? (
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
          onClick={logoutUser}
        >
          Logout
        </a>
      </ul>
      ) : null}
    </div>
  );
};

export default DesktopNavbar;
