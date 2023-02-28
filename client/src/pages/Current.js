import React from 'react';
import MedicationList from '../components/MedicationList';

const Current = () => {
  return (
    <section className="current">
      <h1>Current Medication</h1>
      <button>Add Medication</button>
      <section>
        <MedicationList />
      </section>
    </section>
  );
};

export default Current;
