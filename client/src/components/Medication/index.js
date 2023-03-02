import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_MEDICINE } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';

const Medication = ({ medicine }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [updateMedicine] = useMutation(UPDATE_MEDICINE);
  const [formData, setFormData] = useState({
    name: medicine?.name || '',
    start: medicine?.start || '',
    amount: medicine?.amount || 0,
    interval: medicine?.interval || '',
    subInterval: medicine?.subInterval || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let times = [];
    const form = e.currentTarget;
    const timesEl = form.elements.times;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    for (let i = 0; i < timesEl.length; i++) {
      times.push(timesEl[i].value);
    }

    await updateMedicine({
      variables: { medicineId: medicine._id, medicine: { ...formData, times } },
    });
    
    navigate('/medicines');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'amount'
      ? setFormData({ ...formData, [name]: parseInt(value) })
      : setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Form
        className="form-container"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        action="/medicines"
      >
        <Form.Group className="form-title" controlId="medicineName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            className="form-input"
            onChange={handleChange}
            defaultValue={medicine ? medicine.name : null}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineInterval">
          <Form.Label>Interval:</Form.Label>
          <Form.Select
            type="interval"
            name="interval"
            className="form-input"
            onChange={handleChange}
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
            onChange={handleChange}
            defaultValue={medicine ? medicine.subInterval : null}
          >
            <option>Every</option>
            <option>Every Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineAmount">
          <Form.Label>Total Amount:</Form.Label>
          <Form.Control
            required
            type="number"
            name="amount"
            className="form-input"
            onChange={handleChange}
            defaultValue={medicine ? medicine.amount : null}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineTimes">
          <Form.Label>Times:</Form.Label>
          <ul>
            {medicine ? (
              medicine.times.map((time, index) => {
                return (
                  <li key={index}>
                    <Form.Control
                      required
                      type="time"
                      name="times"
                      className="form-input"
                      onChange={handleChange}
                      defaultValue={time}
                    ></Form.Control>
                  </li>
                );
              })
            ) : (
              <li key={0}>
                <Form.Control
                  required
                  type="time"
                  name="times"
                  className="form-input"
                  onChange={handleChange}
                  defaultValue="00:00"
                ></Form.Control>
              </li>
            )}
          </ul>
        </Form.Group>

        <Button className="form-submit-btn" variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default Medication;
