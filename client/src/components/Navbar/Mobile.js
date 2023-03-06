import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  };

  return (
    <div className="hideDesktop">
      {loggedIn ? (
        <div className="navMobile">
          <section className="d-flex flex-wrap justify-content-around navIcons">
            <a href="/">
              <FontAwesomeIcon icon={faHouse} className="fa-xl" />
            </a>
            <a href="/medicines">
              <FontAwesomeIcon icon={faCapsules} className="fa-xl" />
            </a>
            <button onClick={logoutUser}>
              <FontAwesomeIcon icon={faRightFromBracket} className="fa-xl" />
            </button>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNavbar;
