import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_DAILYMEDS } from '../utils/queries';
import DailyMedication from '../components/DailyMedication';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Daily = () => {
  const sortedMedicine = [];
  const { loading, data, error } = useQuery(QUERY_DAILYMEDS);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (data.dailymeds.length < 1)
    return <h2>You do not have any medication for today.</h2>;

  data.dailymeds.forEach((med) => {
    med.queue.forEach((time) => {
      sortedMedicine.push({ ...med, time: time });
    });
  });

  sortedMedicine.sort((a, b) => {
    const timeA = parseInt(a.time[0] + a.time[1] + a.time[3] + a.time[4]);
    const timeB = parseInt(b.time[0] + b.time[1] + b.time[3] + b.time[4]);
    return timeA - timeB;
  });
  // add logic for checkboxes / boolean

  return (
    <section>
      <Container>
        <div>
          <h2 className="dmedHeader">Daily Medication</h2>
          <ul className="d-flex flex-wrap justify-content-around">
            {sortedMedicine.length ? (
              sortedMedicine.map((medicine, index) => (
                <li
                  key={medicine._id + medicine.time}
                  className="card shadow m-5 p-2 mb-4 bg-white rounded dailyCard"
                >
                  <DailyMedication medicine={medicine} />
                </li>
              ))
            ) : (
              <h2>You do not have any medication for today. </h2>
            )}
          </ul>
        </div>
        <Link to={'/medicines'}>
          <center>
            <Button className="btn-block shadow dBtn rounded-pill">Edit Medications</Button>
          </center>
        </Link>
      </Container>
    </section>
  );
};

export default Daily;
