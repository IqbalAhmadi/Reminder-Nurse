import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCapsules } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';

const MobileNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // assuming the user is initially authenticated
  const handleLogout = () => {
    // TODO: how to implement the logout logic here? This is still incomplete
    Auth.logout();

    setIsAuthenticated(false); // update the auth status
  };
  return (
    <div className='hideDesktop navMobile'>
      {isAuthenticated && (
      <section className="d-flex flex-wrap justify-content-around navIcons">
        <a href="/"><FontAwesomeIcon icon={faHouse} /></a>
        <a href="/medicines"><FontAwesomeIcon icon={faCapsules} /></a>
        <a onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /></a>
      </section>
      )}
    </div>
  );
};

export default MobileNavbar;
