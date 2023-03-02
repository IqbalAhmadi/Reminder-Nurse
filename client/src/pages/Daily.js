import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_DAILYMEDS } from '../utils/queries';
import DailyMedication from '../components/DailyMedication';
import { useParams, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Daily = () => {
  const { loading, data } = useQuery(QUERY_DAILYMEDS);

  if (loading) return <h2>Loading...</h2>;

  return (
    <section>
      <Container>
        <Button>
          <Link to={'/medicines'}>Edit Medications</Link>
        </Button>
        <DailyMedication dailymeds={data.dailymeds} />
      </Container>
    </section>
  );
};

export default Daily;
