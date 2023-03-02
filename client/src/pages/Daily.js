import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_DAILYMEDS } from '../utils/queries';
import DailyMedication from '../components/DailyMedication';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Daily = () => {
  const { loading, data } = useQuery(QUERY_DAILYMEDS);

  if (loading) return <h2>Loading...</h2>;

  const sortedMeds = [];
  data.dailymeds.forEach((med) => {
    med.times.forEach((time) => {
      sortedMeds.push({ ...med, time: time });
    });
  });
  sortedMeds.sort((a, b) => {
    const timeA = parseInt(a.time[0] + a.time[1] + a.time[3] + a.time[4]);
    const timeB = parseInt(b.time[0] + b.time[1] + b.time[3] + b.time[4]);
    return timeA - timeB;
  });

  return (
    <section>
      <Container>
        <Link to={'/medicines'}>
          <Button>Edit Medications</Button>
        </Link>
        <DailyMedication dailymeds={sortedMeds} />
      </Container>
    </section>
  );
};

export default Daily;
