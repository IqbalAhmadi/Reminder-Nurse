import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import { subscribeUser } from '../../subscription';

const DesktopNavbar = ({ access: { loggedIn, setLoggedIn } }) => {
  const navigate = useNavigate();

  const logoutUser = () => {
    Auth.logout();
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="hideMobile navAlignR">
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
      <Button onClick={subscribeUser}>Click</Button>
    </div>
  );
};

export default DesktopNavbar;
