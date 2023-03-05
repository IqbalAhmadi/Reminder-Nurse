import React from 'react';
import rnIcon from '../../assets/images/rn_icon_white.png';

const AppNavbar = () => {
  return (
    <header>
      <img
        src={rnIcon}
        className="headerImgAdj"
        alt="Logo that reads Reminder Nurse"
      />
    </header>
  );
};

export default AppNavbar;
