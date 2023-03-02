import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINE } from '../utils/queries';
import { useParams, Link, Navigate } from 'react-router-dom';
import Medication from '../components/Medication';
import { Button } from 'react-bootstrap';

const Medicine = () => {
  const { medicineId } = useParams();
  const { loading, data } = useQuery(QUERY_MEDICINE, {
    variables: { medicineId },
  });

  if (loading) return <h2>Loading...</h2>;

  return (
    <section className="edit-medication">
      <Button>
        <Link to={'../medicines'}>Go Back</Link>
      </Button>
      <h2>Edit your medications info</h2>
      {data ? (
        <Medication medicine={data.medicine} />
      ) : (
        <Navigate to="../medicines" />
      )}
    </section>
  );
};

export default Medicine;
