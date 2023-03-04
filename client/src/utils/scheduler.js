import addNotification from 'react-push-notification';
import schedule from 'node-schedule';
import { useNavigate } from 'react-router-dom';

class Scheduler {
  constructor(jobs) {
    this.jobs = jobs || [];
  }
  medicineReminder({ time, name }) {
    addNotification({
      title: name + '@' + time,
      message: 'Take your medicine',
      duration: 1000 * 60 * 60,
      native: true,
    });
  }
  setReminder({ time, name }) {
    const jobName = time + '_' + name;
    const date = new Date();
    const hour = time[0] + time[1];
    const minute = time[3] + time[4];

    date.setHours(hour, minute, 0);

    if (this.isScheduled(date)) return false;

    const job = schedule.scheduleJob(jobName, date, () => {
      this.medicineReminder({ time, name });
    });

    this.removeEmptyJobs();

    if (job) this.jobs.push(job);

    return job;
  }
  shutdown() {
    return schedule.gracefulShutdown();
  }
  // checks if job is already created & returns boolean
  isScheduled(date) {
    let isScheduled = false;
    this.jobs.forEach((job) => {
      if (job.pendingInvocations.length > 0) {
        const jobDate = new Date(job.pendingInvocations[0].fireDate._date.ts);
        if (jobDate.toString() === date.toString()) return (isScheduled = true);
      }
    });

    return isScheduled;
  }
  removeEmptyJobs() {
    const tempJobs = this.jobs.filter((job) => job.pendingInvocations.length);
    this.jobs = tempJobs;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Scheduler();
