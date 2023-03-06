import React from 'react';
import Access from '../components/Access';
import Daily from './Daily';

const Home = ({ access: { loggedIn, setLoggedIn } }) => {
  return loggedIn ? (
    <Daily access={{ loggedIn, setLoggedIn }} />
  ) : (
    <Access access={{ setLoggedIn }} />
  );
};

export default Home;
