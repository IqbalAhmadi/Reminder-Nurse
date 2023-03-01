import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_DAILYMEDS } from '../utils/queries';
import DailyMedication from '../components/DailyMedication';

const Daily = () => {
  const { loading, data } = useQuery(QUERY_DAILYMEDS);

  if (loading) return <h2>Loading...</h2>;

  return (
    <section>
      <DailyMedication dailymeds={data.dailymeds} />
    </section>
  );
};

export default Daily;
