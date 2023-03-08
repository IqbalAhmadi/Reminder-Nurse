import './App.css';
import React, { useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Auth from './utils/auth';
import Header from './components/Header';
import DesktopNavbar from './components/Navbar/Desktop';
import MobileNavbar from './components/Navbar/Mobile';
import Home from './pages/Home';
import Medicines from './pages/Medicines';
import Medicine from './pages/Medicine';
import NotFound from './pages/NotFound';
import Notify from './pages/Notify';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <DesktopNavbar access={{ loggedIn, setLoggedIn }} />
        <Container>
          <Routes>
            <Route
              path="/"
              element={<Home access={{ loggedIn, setLoggedIn }} />}
            />
            <Route
              path="/medicines"
              element={loggedIn ? <Medicines /> : <Navigate to="/" />}
            />
            <Route
              path="/medicine/:medicineId"
              element={loggedIn ? <Medicine /> : <Navigate to="/" />}
            />
            <Route path="notify" element={<Notify />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <MobileNavbar access={{ loggedIn, setLoggedIn }} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
