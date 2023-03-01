import React from 'react';
import Button from 'react-bootstrap/Button';

const MedicationList = ({ medicines }) => {
  return (
    <ol className="medication-list display-flex flex-wrap">
      {medicines.map((medicine) => {
        return (
          <li key={medicine._id} style={{ listStyleType: 'none' }}>
            <section className="display-flex">
              <h3>{medicine.name}</h3>
              <section className="m-1">
                <Button variant="secondary">Modify</Button>
                <Button variant="danger">Delete</Button>
              </section>
            </section>
          </li>
        );
      })}
    </ol>
  );
};

export default MedicationList;
