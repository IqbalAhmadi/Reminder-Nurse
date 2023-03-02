import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Home = () => {
  return (
    <section>
      <SignupForm />
      <LoginForm />
    </section>
  );
};

export default Home;
