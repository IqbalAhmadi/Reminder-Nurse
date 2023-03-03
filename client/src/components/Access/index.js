import React from 'react';
import LoginForm from './Login';
import Signup from './Signup';

const Access = ({ setLoggedIn }) => {
  return (
    <section>
      <Signup setLoggedIn={setLoggedIn} />
      <LoginForm setLoggedIn={setLoggedIn} />
    </section>
  );
};

export default Access;
