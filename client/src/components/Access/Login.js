import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const LoginForm = ({ setLoggedIn }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
  });

  const [login, { loading }] = useMutation(LOGIN_USER);

  // set state for form validation
  const [validated] = useState(false);
  // se state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking if form has everything
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({ variables: { ...userFormData } });
      Auth.login(data.login.token);
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
    <form className="login form" onSubmit={handleFormSubmit}>
      <span className="login__icon">RN</span>
      <h2 className="login__title">log in to Reminder Nurse</h2>
      <div className="login__row">
        <label className="login__label" htmlFor="lg-em">
          Username
        </label>
        <input
          className="login__input"
          id="lg-em"
          type="text"
          placeholder="username"
          onChange={handleInputChange}
        />
      </div>
      <div className="login__row">
        <label className="login__label" htmlFor="lg-ps">
          password
        </label>
        <input
          className="login__input"
          id="lg-ps"
          type="password"
          placeholder="**********"
          onChange={handleInputChange}
        />
      </div>
      <div className="login__row">
        <button className="login__button" type="submit">
          sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
