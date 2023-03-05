import React from 'react';
import Scheduler from '../../utils/scheduler';
import 'animate.css';
import rnStatic from '../../assets/images/rn_static_01.png';

const DailyMedication = ({ medicine }) => {
  const createSchedules = async () => {
    await Scheduler.shutdown();
    Scheduler.setReminder({ time: medicine.time, name: medicine.name });
  };

  createSchedules();



  return (
    <div className="row">
      <div className="card-body px-4 pt-1 col-7">
        <h3 className="dailyHeader">{medicine.name}</h3>
        <hr />
        <p className="dailystext">{medicine.time}</p>
        <p className="dailyRemain">
          You have {medicine.amount} remaining dosages.
        </p>
      </div>
      <div className="col">
        <div className="form-check">
          <input
            className="form-check-input dailyCheck"
            type="checkbox"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default DailyMedication;
