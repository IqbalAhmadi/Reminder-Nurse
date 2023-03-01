import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINE } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const Medicine = () => {
  const { medicineId } = useParams();
  const { loading, data } = useQuery(QUERY_MEDICINE, {
    variables: { medicineId },
  });

  if (loading) return <h2>Loading...</h2>;
  const { medicine } = data;

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="medicineName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="name" value={medicine.name}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="medicineStartDate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control type="start" value={medicine.start}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="medicineAmount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control type="amount" value={medicine.amount}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="medicineInterval">
          <Form.Label>Interval:</Form.Label>
          <Form.Control
            type="interval"
            value={medicine.interval}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="medicineSubInterval">
          <Form.Label>Subinterval:</Form.Label>
          <Form.Control
            type="subInterval"
            value={medicine.subInterval}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="medicineTimes">
          <Form.Label>Times:</Form.Label>
          <Form.Control type="times" value={medicine.times}></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Medicine;
