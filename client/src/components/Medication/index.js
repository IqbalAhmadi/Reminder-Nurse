import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_MEDICINE, UPDATE_MEDICINE } from '../../utils/mutations';
import { useNavigate, Link } from 'react-router-dom';
import Time from './Time';

const Medication = ({ medicine, isNew }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [updateMedicine] = useMutation(UPDATE_MEDICINE);
  const [createMedicine] = useMutation(ADD_MEDICINE);
  const [formData, setFormData] = useState({
    name: medicine?.name || '',
    amount: medicine?.amount || 0,
    interval: medicine?.interval || 'daily',
    subInterval: medicine?.subInterval || 'every',
    times: medicine?.times || ['00:00'],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    isNew
      ? await createMedicine({
          variables: {
            medicine: { ...formData },
          },
        })
      : await updateMedicine({
          variables: {
            medicineId: medicine._id,
            medicine: { ...formData },
          },
        });

    navigate('/medicines');
  };

  const handleChange = (e, index) => {
    const times = [];
    const { name, value } = e.target;

    switch (name) {
      case 'amount':
        setFormData({ ...formData, [name]: parseInt(value) });
        break;
      case 'times':
        for (let i = 0; i < formData.times.length; i++)
          i === index ? times.push(value) : times.push(formData.times[i]);
        setFormData({ ...formData, times });
        break;
      default:
        setFormData({ ...formData, [name]: value });
        break;
    }
  };

  const handleAddTime = (e) => {
    const times = [...formData.times, '00:00'];
    setFormData({ ...formData, times });
  };

  const handleRemoveTime = (e) => {
    const times = [...formData.times];
    times.pop();
    setFormData({ ...formData, times });
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
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
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
          <ul className="none d-flex flex-wrap justify-content-evenly">
            {formData.times.map((time, index) => {
              return (
                <Time
                  key={index}
                  data={{ time, index }}
                  handleChange={handleChange}
                  handleRemove={handleRemoveTime}
                />
              );
            })}
          </ul>
          <Button className="add-time" onClick={handleAddTime}>
            Add Time
          </Button>
        </Form.Group>

        <section className="d-flex flex-wrap justify-content-evenly">
          <Button
            className="form-submit-btn m-0"
            variant="primary"
            type="submit"
          >
            Save
          </Button>
          <Link to={'../medicines'}>
            <Button className="form-submit-btn" variant="primary">
              Cancel
            </Button>
          </Link>
        </section>
      </Form>
    </Container>
  );
};

export default Medication;
