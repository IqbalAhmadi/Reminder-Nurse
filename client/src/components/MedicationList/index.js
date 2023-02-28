import React from 'react';
// import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from '../../utils/queries';

const MedicationList = ({}) => {
  const { loading, data } = useQuery(QUERY_MEDICINES);

  if (loading) return <h2>Loading...</h2>;
  console.log(data);
  return <>{data}</>;
};

export default MedicationList;
