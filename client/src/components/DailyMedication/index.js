import React from 'react';

const DailyMedication = ({ dailymeds }) => {
  if (!dailymeds.length) {
    return <h2>You do not have any medication for today.</h2>;
  }

  return (
    <div>
      <h2 className="dmedHeader">Daily Medication</h2>
      <ul className="list-group">
        {dailymeds.map((med) => {
          return (
            <li
              key={med._id + med.time}
              className="card shadow p-2 mb-4 bg-white rounded"
            >
              <div className="card-body px-4 pt-3">
                <h3 className="text-primary">{med.name}</h3>
                <p className="text-dark">Take dosage at {med.time}</p>
                <hr />
                <p className="text-muted small">
                  You have {med.amount} remaining dosages.
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DailyMedication;
