import React from 'react';
import Scheduler from '../../utils/scheduler';
import { useMutation } from '@apollo/client';
import { TOGGLE_CHECKED } from '../../utils/mutations';
import { toggledQueueCheckedCache } from '../../utils/handleCache';
import 'animate.css';

const DailyMedication = ({ medicine }) => {
  const [toggleChecked] = useMutation(TOGGLE_CHECKED, toggledQueueCheckedCache);

  const createSchedules = async () => {
    await Scheduler.shutdown();
    Scheduler.setReminder({ time: medicine.current.time, name: medicine.name });
  };

  const handleCheck = async (e) => {
    const medicineId = medicine._id;
    const queueId = medicine.current._id;
    await toggleChecked({ variables: { medicineId, queueId } });
  };

  if (false && !medicine.current.checked) createSchedules();

  return (
    <div className="row">
      <div className="card-body px-4 pt-1 col-7">
        <h3 className="dailyHeader">{medicine.name}</h3>
        <hr />
        <p className="dailystext">Take at {medicine.time}</p>
        <p className="dailystext">{medicine.current.time}</p>
        <p className="dailyRemain">
          You have {medicine.amount} remaining dosages.
        </p>
      </div>
      <div className="col">
        <div className="form-check">
          <input
            onChange={handleCheck}
            checked={medicine.current.checked}
            disabled={medicine.current.checked}
            className="form-check-input dailyCheck"
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
};

export default DailyMedication;
