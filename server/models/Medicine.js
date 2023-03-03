const dayjs = require('dayjs');
const { Schema, model } = require('mongoose');

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
  // time/queue format HH:mm
  times: [String],
  queue: [String],
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
  const today = new Date().setHours(0, 0, 0, 0);
  const queueDate = this.queueLastFilled.setHours(0, 0, 0, 0);

  if (queueDate < today) return false;
  else return true;
};

const Medicine = model('Medicine', medicineSchema);

module.exports = Medicine;
