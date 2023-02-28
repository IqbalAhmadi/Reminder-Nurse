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
    get: (timestamp) => dateFormat(timestamp),
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
  times: [Date],
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
