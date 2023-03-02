import React from 'react';
// importing node scheduler package
//const schedule = require('node-schedule')
// // at 23:59PM, runs the following function
// const getDailyList = schedule.scheduleJob('0 59 23 * * *', function() {
//     console.log('test')
// })

const DailyMedication = ({ dailymeds }) => {
  if (!dailymeds.length) {
    return <h2>You do not have any medication for today.</h2>;
  }

  return (
    <div>
      <h2>Daily Medication</h2>
      <ul class="list-group">
        {dailymeds.map((dailymeds) => {
          return (
            <div className="card">
              <div key={dailymeds._id} className="card-body px-4 pt-3">
                <h3 className="text-primary">{dailymeds.name}</h3>
                <p className="text-dark">Take dosage at {dailymeds.times}</p>
                <hr />
                <p className="text-muted small">
                  You have {dailymeds.amount} remaining dosages.
                </p>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default DailyMedication;
