import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import LoginForm from './Login';
import Signup from './Signup';

const Access = ({ access: { setLoggedIn } }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const login = React.useRef(null);
  const signup = React.useRef(null);
  const nodeRef = showLoginForm ? login : signup;

  const switchForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <section className="LandingContain">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={showLoginForm}
          timeout={500}
          classNames="fade"
          nodeRef={nodeRef}
        >
          <article ref={nodeRef}>
            {showLoginForm ? (
              <LoginForm switchForm={switchForm} setLoggedIn={setLoggedIn} />
            ) : (
              <Signup switchForm={switchForm} setLoggedIn={setLoggedIn} />
            )}
          </article>
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
};

export default Access;
