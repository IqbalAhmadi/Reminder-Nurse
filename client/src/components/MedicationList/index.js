import React from 'react';

const MedicationList = ({ medicines }) => {
  return (
    <ol>
      {medicines.map((medicine) => {
        return <li key={medicine._id}>{medicine.name}</li>;
      })}
    </ol>
  );
};

export default MedicationList;
