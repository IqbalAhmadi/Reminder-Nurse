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
      <Link to={'../medicines'}>
        <Button>Go Back</Button>
      </Link>
      <h2>Edit your medications info</h2>
      {/* if route has proper id or add load edit or add */}
      {data || medicineId === 'add' ? (
        data ? (
          <Medication medicine={data.medicine} isNew={false} />
        ) : (
          <Medication medicine={null} isNew={true} />
        )
      ) : (
        <Navigate to="../medicines" />
      )}
    </section>
  );
};

export default Medicine;
