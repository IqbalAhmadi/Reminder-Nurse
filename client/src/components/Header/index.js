import React from 'react';
import rnIcon from '../../assets/images/rn_icon_white.png';

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center">
      <img
        src={rnIcon}
        className="headerImgAdj"
        alt="Logo that reads Reminder Nurse"
      />
    </header>
  );
};

export default Header;
