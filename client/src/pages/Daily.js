import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_DAILYMEDS } from '../utils/queries';
import DailyMedication from '../components/DailyMedication';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Daily = () => {
  const { loading, data } = useQuery(QUERY_DAILYMEDS);

  if (loading) return <h2>Loading...</h2>;

  return (
    <section>
      <Container>
        <Link to={'/medicines'}>
          <Button>Edit Medications</Button>
        </Link>
        <DailyMedication dailymeds={data.dailymeds} />
      </Container>
    </section>
  );
};

export default Daily;
