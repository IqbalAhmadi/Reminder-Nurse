import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const SignupForm = ({ setLoggedIn, switchForm }) => {
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
    <article className="userForm">
      {/* This is needed for the validation functionality above */}
      <Form
        className="form-container"
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
      >
        <Button className="form-switch-btn" onClick={switchForm}>
          Login
        </Button>
        {/* show alert if server response is bad */}
        <Alert
          className="alert"
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>
        <Form.Group className="form-title">
          <h4 className="title-signup">Sign Up</h4>
          <p className="subTitle">Create your account today!</p>
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
          disabled={
            !(userFormData.username && userFormData.password) || loading
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </article>
  );
};

export default SignupForm;
