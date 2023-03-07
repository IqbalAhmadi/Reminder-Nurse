import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const SignupForm = ({ setLoggedIn, switchForm, signupFormOpen }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
  });

  const [addUser, { loading }] = useMutation(ADD_USER);
  //set state for form validation
  const [validated] = useState(false);
  //set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.addUser.token);
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <form
      className={signupFormOpen ? 'signup is-form-open form' : 'signup form'}
      id="signup"
    >
      <svg
        onClick={switchForm}
        className={
          signupFormOpen
            ? 'svg-icon signup__trigger signup__trigger--fixed'
            : 'svg-icon signup__trigger signup__trigger--fixed is-trigger-hidden'
        }
        viewBox="0 0 20 20"
      >
        <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
      </svg>
      <div
        className={
          signupFormOpen
            ? 'signup__wrapper is-wrapper-open'
            : 'signup__wrapper '
        }
        id="signup-wrapper"
      >
        <div className="signup__row signup__row--flex">
          <span className="signup__icon">RN</span>
          <svg
            onClick={switchForm}
            className="svg-icon signup__trigger"
            viewBox="0 0 20 20"
          >
            <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
          </svg>
        </div>
        <h2 className="signup__title">sign up for Reminder Nurse</h2>
        <div className="signup__row">
          <label className="signup__label" htmlFor="su-us">
            username
          </label>
          <input
            className="signup__input"
            id="su-us"
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div className="signup__row">
          <label className="signup__label" htmlFor="su-ps">
            password
          </label>
          <input
            className="signup__input"
            id="su-ps"
            type="password"
            placeholder="**********"
          />
        </div>
        <div className="signup__row">
          <button className="signup__button" type="submit">
            sign up
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
