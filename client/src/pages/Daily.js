import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from '../utils/queries';
import DailyMedication from '../components/DailyMedication';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import rnStatic from '../assets/images/rn_static_01.png';

const Daily = () => {
  const sortedMedicine = [];
  // change query to all for caching purposes, handle isActive logic on this end
  const { loading, data, error } = useQuery(QUERY_MEDICINES);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{console.log(error)}</h2>;

  const activeMedicines = data.medicines.filter(
    (medicine) => medicine.isActive
  );

  activeMedicines.forEach((med) => {
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
        <div>
        <h2 className="dmedHeader">daily medication</h2>
      <center>
      <div className="row dTop">
        <div className='imgContain col-5'>
          <img
        src={rnStatic}
        className="imgNurse"
        alt="Icon of the Reminder Nurse"
      />
        </div>
      <div className='col-5 animate__animated animate__fadeIn'>
        <div className="card dailyDialogue border-0 shadow-sm">
         <div className="card-body">
          Let's look at your medications today.
        </div>
      </div>
      </div>
      </div>
      </center>
          <ul className="d-flex flex-wrap justify-content-around dCardMob">
            {sortedMedicine.length ? (
              sortedMedicine.map((medicine, index) => (
                <li
                  key={medicine._id + medicine.time}
                  className="card shadow m-2 p-3 mb-4 bg-white rounded dailyCard"
                >
                  <DailyMedication medicine={medicine} />
                </li>
              ))
            ) : (
              <h2>You do not have any medication for today. </h2>
            )}
          </ul>
        </div>
        {/* <Link to={'/medicines'}>
          <center>
            <Button className="btn-block shadow dBtn rounded-pill mb-4">Edit Medications</Button>
          </center>
        </Link> */}
    </section>
  );
};

export default Daily;
