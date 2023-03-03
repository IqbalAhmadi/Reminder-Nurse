import React, { useState } from 'react';
import Auth from '../utils/auth';
import Access from '../components/Access';
import Daily from './Daily';

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());
  return loggedIn ? <Daily /> : <Access setLoggedIn={setLoggedIn} />;
};

export default Home;
