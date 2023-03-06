import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rnIcon from '../../assets/images/rn_icon_white.png';
import Auth from '../../utils/auth';

const AppNavbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(Auth.loggedIn());

  const logoutUser = () => {
    Auth.logout();
    setIsAuthenticated(false);
    navigate('/');
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
      {isAuthenticated ? (
        <button
          className="logout-button btn btn-light btn-sm  "
          onClick={logoutUser}
        >
          Log out
        </button>
      ) : null}
    </header>
  );
};

export default AppNavbar;
