import React, { useState } from 'react';
// import NavStyles from './styles/NavStyles';
import { Link } from 'react-router-dom';
import rnIcon from '../../assets/rn_icon_white.png'

const AppNavbar = () => {
  return (
    <header>
      <img src={rnIcon} className='headerImgAdj' alt='Logo that reads Reminder Nurse'/>
    </header>
  );
};

export default AppNavbar;
