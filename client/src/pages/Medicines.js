import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from '../utils/queries';
import MedicationList from '../components/MedicationList';
import { Container, Button } from 'react-bootstrap';

const Medicines = () => {
  const { loading, data } = useQuery(QUERY_MEDICINES);

  if (loading) return <h2>Loading...</h2>;

  return (
    <Container>
      <section className="display-flex justify-space-between flex-wrap">
        <h1>Current Medication</h1>
        <Button>Add Medication</Button>
      </section>
      <section>
        <MedicationList medicines={data.medicines} />
      </section>
    </Container>
  );
};

export default Medicines;
