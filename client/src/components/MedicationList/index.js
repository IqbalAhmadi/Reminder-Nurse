import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { TOGGLE_ACTIVE } from '../../utils/mutations';
import { toggleIsActiveCache } from '../../utils/handleCache';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const MedicationList = ({ medicines, isActive }) => {
  const [toggleIsActive] = useMutation(TOGGLE_ACTIVE, toggleIsActiveCache);

  const handleMedicineToggle = async (e) => {
    try {
      const medicineId = e.target.id;
      await toggleIsActive({ variables: { medicineId } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ol className="medication-list display-flex flex-wrap justify-content-between MedContMob">
      {medicines.map((medicine) =>
        isActive === medicine.isActive ? (
          <li key={medicine._id} style={{ listStyleType: 'none' }}>
            <section className="m-1 display-flex justify-content-around flex-wrap">
              <h3 className="MedName">{medicine.name}</h3>
              <section className="d-flex m-1 flex-wrap justify-content-end">
                <Link to={'../medicine/' + medicine._id}>
                  <FontAwesomeIcon
                    icon={faFilePen}
                    className="fa-xl MedFAIcon MedToggleB"
                  />
                </Link>
                {isActive ? (
                  <Button
                    className="MedToggleB"
                    onClick={handleMedicineToggle}
                    id={medicine._id}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="fa-xl fa-regular MedFAIcon"
                      disabled={medicine.amount > 0 ? false : true}
                    />
                  </Button>
                ) : (
                  <Button
                    className="MedToggleB"
                    onClick={handleMedicineToggle}
                    id={medicine._id}
                  >
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="fa-xl fa-regular MedFAIcon"
                      disabled={medicine.amount > 0 ? false : true}
                    />
                  </Button>
                )}
              </section>
            </section>
          </li>
        ) : null
      )}
    </ol>
  );
};

export default MedicationList;
