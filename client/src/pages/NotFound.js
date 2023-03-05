import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">Looks like you're lost!</h3>
                  <p>The page you are looking for is not available!</p>
                  {/*TODO: insert link to Go to Home. We may need to delete this once we get to the button creation part */}
                  <Link to="/">Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Home;
