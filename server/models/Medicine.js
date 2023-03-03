const dayjs = require('dayjs');
const { Schema, model } = require('mongoose');

const timeGetter = (timestamp) => {
  // format to HH:MM
  return dayjs(timestamp).format('HH:mm');
};

const timeSetter = (timestamp) => {
  const hour = parseInt(timestamp[0] + timestamp[1]);
  const minute = parseInt(timestamp[3] + timestamp[4]);
  const date = dayjs().set('hour', hour).set('minute', minute);
  return date;
};

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  interval: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily',
    required: true,
  },
  subInterval: {
    type: String,
    enum: ['every', 'every other'],
    default: 'every',
    required: true,
  },
  times: [
    {
      type: Date,
      get: timeGetter,
      set: timeSetter,
    },
  ],
  queue: [
    {
      type: Date,
      get: timeGetter,
      set: timeSetter,
    },
  ],
  queueLastFilled: {
    type: Date,
    required: true,
    default: new Date(1995, 11, 17),
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// returns true or false if the queue has been filled today
medicineSchema.methods.checkQueue = async function () {
  const today = new Date();
  if (this.queueLastFilled.toDateString() < today.toDateString()) return false;
  else return true;
};

const Medicine = model('Medicine', medicineSchema);

module.exports = Medicine;
