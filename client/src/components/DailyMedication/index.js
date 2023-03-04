import React from 'react';
import Scheduler from '../../utils/scheduler';
import 'animate.css';
import rnStatic from '../../assets/images/rn_static_01.png';

const DailyMedication = ({ dailymeds }) => {
  if (!dailymeds.length) {
    return <h2>You do not have any medication for today.</h2>;
  }

  const createSchedules = async () => {
    await Scheduler.shutdown();
    Scheduler.setReminder({ time: '11:39', name: 'Xanax' });
  };

  createSchedules();

  return (
    <div>
      <h2 className="dmedHeader">daily medication</h2>
      <center>
        <div className="row dTop">
          <div className="imgContain col-5">
            <img
              src={rnStatic}
              className="imgNurse"
              alt="Icon of the Reminder Nurse"
            />
          </div>
          <div className="col-5 animate__animated animate__fadeIn">
            <div className="card dailyDialogue border-0 shadow-sm">
              <div className="card-body">
                Let's take at your medications today.
              </div>
            </div>
          </div>
        </div>
      </center>
      <ul className="list-group">
        {dailymeds.map((med) => {
          return (
            <li
              key={med._id + med.time}
              className="card shadow p-2 mb-4 bg-white rounded container dailyCard border-0"
            >
              <div className="row">
                <div className="card-body px-4 pt-1 col-7 ">
                  <h3 className="dailyHeader">{med.name}</h3>
                  <hr />
                  <p className="dailystext">{med.time}</p>
                  <p className="dailyRemain">
                    You have {med.amount} remaining dosages.
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DailyMedication;
