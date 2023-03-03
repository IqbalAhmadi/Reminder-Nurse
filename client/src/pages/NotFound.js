import React from 'react';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <section
        dangerouslySetInnerHTML={{
          __html: `
        <html>
        <head>
        <meta charset="utf-8" />
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="viewport"
          content="width=device-width,maximum-scale=1,user-scalable=no,minimal-ui"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,800&amp;subset=latin,latin-ext"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.travel.sygic.com/travel.sygic.com_lp/css/404.css?9267bb3cab874302435dffd6b29bbb65e3da2cf8"
        />
        <title>404 Page</title>
      </head>
      <body>
        <div class="stars"></div>
    
        <div class="sun-moon">
          <div class="sun"></div>
          <div class="moon"></div>
        </div>
    
        <div id="js-hills" class="background hills"></div>
        <div id="js-country" class="background country"></div>
        <div id="js-foreground" class="background foreground"></div>
    
        <div class="error-content">
          It seems like we couldn't find the page you were looking for.
        </div>
    
        <a href="/" class="button-home">Go Home</a>
    
        <div class="code">
          <span>4</span>
          <span>⛑️</span>
          <span>4</span>
        </div>
      </body>
        
        </html>
            `,
        }}
      />
    </Container>
  );
};

export default Home;
