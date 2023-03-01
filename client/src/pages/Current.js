import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from '../utils/queries';
import MedicationList from '../components/MedicationList';
import Button from 'react-bootstrap/Button';

const Current = () => {
  const { loading, data } = useQuery(QUERY_MEDICINES);

  if (loading) return <h2>Loading...</h2>;

  return (
    <section className="current">
      <h1>Current Medication</h1>
      <Button>Add Medication</Button>
      <section>
        <MedicationList medicines={data.medicines} />
      </section>
    </section>
  );
};

export default Current;
