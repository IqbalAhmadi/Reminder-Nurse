const dayjs = require('dayjs');
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  start: {
    type: Date,
    required: true,
    default: Date.now,
    get: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD'),
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
      get: (timestamp) => {
        // format to HH:MM
        return dayjs(timestamp).format('HH:mm');
      },
      set: (timestamp) => {
        const hour = parseInt(timestamp[0] + timestamp[1]);
        const minute = parseInt(timestamp[3] + timestamp[4]);
        const date = dayjs().set('hour', hour).set('minute', minute);
        return date;
      },
    },
  ],
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

const Medicine = model('Medicine', medicineSchema);

module.exports = Medicine;
