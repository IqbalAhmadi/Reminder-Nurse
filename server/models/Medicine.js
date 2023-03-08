const dayjs = require('dayjs');
const { Schema, model, Types } = require('mongoose');

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dosage: {
    type: Number,
    min: [1],
    default: 1,
    required: true,
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
  queue: [
    {
      time: { type: String, required: true },
      checked: { type: Boolean, default: false },
    },
  ],
  queueLastFilled: {
    type: Date,
    required: true,
    default: new Date().setHours(0, 0, 0, 0),
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
    this.times.forEach((time) => this.queue.push({ time }));
  }

  next();
});

medicineSchema.pre('findOneAndUpdate', async function (next) {
  const original = await this.model.findOne(this.getQuery());
  const update = this.getUpdate();

  if (update.amount < 1) update.isActive = false;

  // removes not found times then adds new ones
  if (update.times) {
    let removeIndexes = [];

    // finds the indexes which will be removed
    original.queue.forEach((obj, index) => {
      let found = false;
      // return false if time is in both original and update else return true
      for (let i = 0; i < update.times.length; i++) {
        if (update.times[i] === obj.time) found = true;
      }

      if (!found) removeIndexes.push(index);
    });

    for (let i = removeIndexes.length - 1; i >= 0; i--) {
      original.queue.splice(removeIndexes[i], 1);
    }

    // copies over the queue we edited
    update.queue = original.queue;

    // adds time to queue if not found
    update.times.forEach((time) => {
      let found = false;

      update.queue.forEach((queueTime) =>
        queueTime.time === time ? (found = true) : null
      );

      if (!found) update.queue.push({ time });
    });
  }
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
