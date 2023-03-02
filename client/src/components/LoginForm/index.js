import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const LoginForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
  });

  const [login, { error, data }] = useMutation(LOGIN_USER);
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

    // TODO: Needs to work on this
    // try {
    //   const response = await loginUser(userFormData);

    //   if (!response.ok) {
    //     throw new Error('Oops! something went wrong!');
    //   }

    //   const { token, user } = await response.json();
    //   console.log(user);
    //   Auth.login(token);
    // } catch (err) {
    //   console.error(err);
    //   setShowAlert(true);
    // }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <>
      <Form
        className="form-container-login"
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
      >
        <Alert
          className="alert"
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="form-title">
          <h4 className="title-signup">Log In</h4>
          <Form.Label className="label-usrName" htmlFor="username">
            Username
          </Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-title">
          <Form.Label className="label-usrName" htmlFor="password">
            Password
          </Form.Label>
          <Form.Control
            className="form-input"
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className="form-submit-btn"
          disabled={!(userFormData.username && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
