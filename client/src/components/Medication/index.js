import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Medication = ({ medicine }) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: medicine.name || '',
    start: medicine.start || '',
    amount: medicine.amount || '',
    interval: medicine.interval || '',
    subInterval: medicine.subInterval || '',
    times: medicine.times || [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name != 'times') setFormData({ ...formData, [name]: value });
    console.log(e.target.defaultValue);
  };

  return (
    <Container>
      <Form
        className="form-container"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="form-title" controlId="medicineName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            className="form-input"
            onBlur={handleChange}
            defaultValue={medicine ? medicine.name : null}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineStartDate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            required
            type="date"
            name="start"
            className="form-input"
            onBlur={handleChange}
            defaultValue={medicine ? medicine.start : null}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineAmount">
          <Form.Label>Total Amount:</Form.Label>
          <Form.Control
            required
            type="number"
            name="amount"
            className="form-input"
            onBlur={handleChange}
            defaultValue={medicine ? medicine.amount : null}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineInterval">
          <Form.Label>Interval:</Form.Label>
          <Form.Select
            type="interval"
            name="interval"
            className="form-input"
            onBlur={handleChange}
            defaultValue={medicine ? medicine.interval : null}
          >
            <option defaultValue="daily">Daily</option>
            <option defaultValue="weekly">Weekly</option>
            <option defaultValue="monthly">Monthly</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineSubInterval">
          <Form.Label>Subinterval:</Form.Label>
          <Form.Select
            type="subInterval"
            name="subInterval"
            className="form-input"
            onBlur={handleChange}
            defaultValue={medicine ? medicine.subInterval : null}
          >
            <option>Every</option>
            <option>Every Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineTimes">
          <Form.Label>Times:</Form.Label>
          {medicine
            ? medicine.times.map((time, index) => {
                return (
                  <Form.Control
                    required
                    type="time"
                    name="times"
                    key={time}
                    className="form-input"
                    onBlur={handleChange}
                    defaultValue={time}
                  ></Form.Control>
                );
              })
            : null}
        </Form.Group>

        <Button className="form-submit-btn" variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default Medication;
