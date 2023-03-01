import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const MedicationList = ({ medicines }) => {
  const handleMedicineDelete = async () => {};

  return (
    <ol className="medication-list display-flex flex-wrap">
      {medicines.map((medicine) => {
        return (
          <li key={medicine._id} style={{ listStyleType: 'none' }}>
            <section className="display-flex">
              <h3>{medicine.name}</h3>
              <section className="m-1">
                <Button variant="secondary">
                  <Link to={'../medicine/' + medicine._id}>Modify</Link>
                </Button>
                <Button variant="danger" onClick={handleMedicineDelete}>
                  Delete
                </Button>
              </section>
            </section>
          </li>
        );
      })}
    </ol>
  );
};

export default MedicationList;
