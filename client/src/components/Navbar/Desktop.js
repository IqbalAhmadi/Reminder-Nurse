import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <section className="hideMobile navAlignR">
      {loggedIn ? (
        <ul className="d-flex flex-wrap justify-content-center navContent">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/medicines">Your Medications</Link>
          </li>
          <button className="navNotButton" onClick={logoutUser}>
            Logout
          </button>
        </ul>
      ) : null}
    </section>
  );
};

export default DesktopNavbar;
