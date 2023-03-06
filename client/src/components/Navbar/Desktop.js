import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';

const DesktopNavbar = ({ access: { loggedIn, setLoggedIn } }) => {
  const navigate = useNavigate();

  const logoutUser = () => {
    Auth.logout();
    setLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="hideMobile navAlignR">
      {loggedIn ? (
        <ul className="d-flex flex-wrap justify-content-center navContent">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/medicines">Your Medications</a>
          </li>
          <button className="navNotButton" onClick={logoutUser}>
            Logout
          </button>
        </ul>
      ) : null}
    </div>
  );
};

export default DesktopNavbar;
