import './App.css';
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Current from './pages/Current';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/current" element={<Current />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
