import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCapsules } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';

const MobileNavbar = ({ access: { loggedIn, setLoggedIn } }) => {
  const navigate = useNavigate();

  const logoutUser = () => {
    Auth.logout();
    setLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <section className="hideDesktop">
      {loggedIn ? (
        <div className="navMobile">
          <section className="d-flex flex-wrap justify-content-around navIcons">
            <Link to="/">
              <FontAwesomeIcon icon={faHouse} className="fa-xl" />
            </Link>
            <Link to="/medicines">
              <FontAwesomeIcon icon={faCapsules} className="fa-xl" />
            </Link>
            <button onClick={logoutUser}>
              <FontAwesomeIcon icon={faRightFromBracket} className="fa-xl" />
            </button>
          </section>
        </div>
      ) : null}
    </section>
  );
};

export default MobileNavbar;
