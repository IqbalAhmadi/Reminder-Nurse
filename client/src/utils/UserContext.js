import React, { useState, useContext } from 'react';
import Auth from './auth';

export const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);

const UserProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

  const updateLoggedIn = () => {
    setLoggedIn(Auth.loggedIn());
  };

  return <UserContext.Provider value={{ loggedIn, updateLoggedIn }} />;
};

export default UserProvider;
