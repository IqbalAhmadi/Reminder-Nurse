import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINE } from '../utils/queries';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Medicine = () => {
  const { medicineId } = useParams();
  const { loading, data } = useQuery(QUERY_MEDICINE, {
    variables: { medicineId },
  });

  if (loading) return <h2>Loading...</h2>;
  console.log(data.medicine);
  return (
    <section>
      <ol></ol>
    </section>
  );
};

export default Medicine;
