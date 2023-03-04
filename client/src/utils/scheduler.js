import addNotification from 'react-push-notification';
import schedule from 'node-schedule';

class Scheduler {
  medicineReminder({ title, message }) {
    addNotification({
      title,
      message,
      duration: 3000,
      native: true,
    });
  }
  setReminder({ time }) {
    const rule = new schedule.RecurrenceRule();
    const job = schedule.RecurrenceRule('10 * * * * *', function () {
      this.medicineReminder({ title: 'test', message: 'testing' });
    });
  }
}

export default new Scheduler();
