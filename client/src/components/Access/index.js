import React, { useState } from 'react';
import './styles.css';
import LoginForm from './Login';
import Signup from './Signup';

const Access = ({ access: { setLoggedIn } }) => {
  const [signupFormOpen, setSignupFormOpen] = useState(true);

  const switchForm = () => {
    console.log('ding');
    setSignupFormOpen(!signupFormOpen);
  };

  return (
    <div className="container container2">
      <LoginForm setLoggedIn={setLoggedIn} />
      <Signup
        switchForm={switchForm}
        setLoggedIn={setLoggedIn}
        signupFormOpen={signupFormOpen}
      />
    </div>
  );
};

export default Access;
