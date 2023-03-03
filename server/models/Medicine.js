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

// makes inactive if amount < 1
medicineSchema.pre('save', async function (next) {
  if ((this.isNew || this.isModified('amount')) && this.amount < 1) {
    this.isActive = false;
  }

  next();
});

// returns true or false if the queue has to be filled
medicineSchema.methods.fillQueue = async function () {
  const queueDate = dayjs(this.queueLastFilled);
  const daysPassed = dayjs().diff(queueDate, 'day');

  // depending on interval if enough days have passed then return true else false
  switch (this.interval) {
    case 'monthly':
      if (daysPassed < 29) break;
    case 'weekly':
      if (daysPassed < 7) break;
    case 'daily':
      if (daysPassed < 1) break;
    default:
      return true;
  }

  return false;
};

const Medicine = model('Medicine', medicineSchema);

module.exports = Medicine;
