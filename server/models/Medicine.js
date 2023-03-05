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
    min: [0, 'must be higher than 0'],
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
  times: [
    {
      type: String,
      validate: function (time) {
        // check there aren't duplicate times
        let found = 0;

        for (let i = 0; i < this.times.length; i++)
          if (this.times[i] == time) found++;
        if (found > 1) return false;
        else return true;
      },
    },
  ],
  queue: [String],
  queueLastFilled: {
    type: Date,
    required: true,
    default: new Date(),
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
  if (this.isNew || this.isModified('times')) {
    this.queue = [...this.times];
  }

  next();
});

medicineSchema.pre('findOneAndUpdate', async function (next) {
  const medicine = this.getUpdate();
  if (medicine.amount < 1) medicine.isActive = false;
  next();
});

// returns true or false if the queue has to be filled
medicineSchema.methods.fillQueue = async function () {
  const queueDate = dayjs(this.queueLastFilled);
  const daysPassed = dayjs().diff(queueDate, 'day');
  const subInterval = this.subInterval === 'every' ? 1 : 2;

  // depending on interval if enough days have passed then return true else false
  switch (this.interval) {
    case 'monthly':
      if (daysPassed < 30 * subInterval) break;
    case 'weekly':
      if (daysPassed < 7 * subInterval) break;
    case 'daily':
      if (daysPassed < 1 * subInterval) break;
    default:
      return true;
  }

  return false;
};

const Medicine = model('Medicine', medicineSchema);

module.exports = Medicine;
