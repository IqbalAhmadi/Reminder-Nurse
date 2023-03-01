import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Home = () => {
  return (
    <div>
      <SignupForm />
      <LoginForm />
    </div>
  );
};

export default Home;
