import React from 'react';
import LoginForm from './Login';
import Signup from './Signup';

const Access = ({ access: { setLoggedIn } }) => {
  return (
    <section>
      <Signup setLoggedIn={setLoggedIn} />
      <LoginForm setLoggedIn={setLoggedIn} />
    </section>
  );
};

export default Access;
