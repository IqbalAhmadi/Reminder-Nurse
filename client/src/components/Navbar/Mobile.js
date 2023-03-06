import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCapsules } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';

const MobileNavbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(Auth.loggedIn());
  
    const logoutUser = () => {
      Auth.logout();
      setIsAuthenticated(false);
      navigate('/');
    };


  return (
    <div className='hideDesktop'>
      {isAuthenticated ? (
        <div className='navMobile'>
      <section className="d-flex flex-wrap justify-content-around navIcons">
        <a href="/"><FontAwesomeIcon icon={faHouse} /></a>
        <a href="/medicines"><FontAwesomeIcon icon={faCapsules} /></a>
        <a onClick={logoutUser}><FontAwesomeIcon icon={faRightFromBracket} /></a>
      </section>
      </div>
      ) : null}
    </div>
  );
};

export default MobileNavbar;
