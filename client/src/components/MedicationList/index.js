import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { TOGGLE_ACTIVE } from '../../utils/mutations';

const MedicationList = ({ medicines, isActive }) => {
  const [toggleMedicine] = useMutation(TOGGLE_ACTIVE);

  const handleMedicineToggle = async (e) => {
    try {
      const medicineId = e.target.id;
      await toggleMedicine({ variables: { medicineId } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ol className="medication-list display-flex flex-wrap justify-content-center">
      {medicines.map((medicine) =>
        isActive === medicine.isActive ? (
          <li key={medicine._id} style={{ listStyleType: 'none' }}>
            <section className="m-1 display-flex justify-content-between flex-wrap">
              <h3>{medicine.name}</h3>
              <section className="d-flex m-1 flex-wrap justify-content-end">
                <Button variant="secondary">
                  <Link to={'../medicine/' + medicine._id}>Modify</Link>
                </Button>
                <Button
                  variant={isActive ? 'danger' : 'success'}
                  id={medicine._id}
                  onClick={handleMedicineToggle}
                >
                  {isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </section>
            </section>
          </li>
        ) : null
      )}
    </ol>
  );
};

export default MedicationList;
