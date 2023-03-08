import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <section className="page_404">
        <article className="container">
          <div className="row">
            <section className="col-sm-12">
              <section className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>
                <section className="contant_box_404">
                  <h3 className="h2">Looks like you're lost!</h3>
                  <p>The page you are looking for is not available!</p>
                  <Link to="/">Home</Link>
                </section>
              </section>
            </section>
          </div>
        </article>
      </section>
    </Container>
  );
};

export default Home;
