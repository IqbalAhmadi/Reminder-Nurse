import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <h2>Page not found.</h2>
      <Link to={''}>
        <Button>Home</Button>
      </Link>
      <Link to={'medicines'}>
        <Button>Medicines</Button>
      </Link>
    </Container>
  );
};

export default Home;
