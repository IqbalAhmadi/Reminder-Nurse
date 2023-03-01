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
    <ol>
      {dailymeds.map((dailymeds) => {
        return (
          <li key={dailymeds._id} className="list-group-item">
            <p>{dailymeds.name}</p>
            <p>
              {dailymeds.amount} at {dailymeds.times}
            </p>
          </li>
        );
      })}
    </ol>
  );
};

export default DailyMedication;
