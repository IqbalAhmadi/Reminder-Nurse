const { AuthenticationError } = require('apollo-server-express');
const { User, Medicine } = require('../models');
const { findOneAndUpdate } = require('../models/Medicine');
const { signToken } = require('../utils/auth');
const { updateQueue } = require('../utils/updateQueue');

const resolvers = {
  Query: {
    // get single medicine
    medicine: async (parent, { medicineId }, context) => {
      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');
      return Medicine.findOne({ _id: medicineId, userId: context.user._id });
    },
    // gets all medicine matching userId using context
    medicines: async (parent, args, context) => {
      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');
      const userMedicines = await Medicine.find({ userId: context.user._id });

      const updatedMedicines = await updateQueue(userMedicines);

      return updatedMedicines;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // User login mutation
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Incorrect username or password!');
      }
      // check the password
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect username or password!');
      }
      const token = signToken(user);
      return { token, user };
    },

    // adds new medicine using context for userId
    addMedicine: async (parent, { medicine }, context) => {
      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');

      const newMedicine = await Medicine.create({
        ...medicine,
        userId: context.user._id,
      });

      return newMedicine;
    },
    // updates fields of medicine depending on whats passed in
    updateMedicine: async (parent, { medicineId, medicine }, context) => {
      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');

      const updatedMedicine = await Medicine.findOneAndUpdate(
        { _id: medicineId, userId: context.user._id },
        { ...medicine },
        { new: true }
      );

      return updatedMedicine;
    },
    // toggles isActive of specific medicine
    toggleIsActive: async (parent, { medicineId }, context) => {
      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');

      const toggledIsActive = await Medicine.findOneAndUpdate(
        { _id: medicineId, userId: context.user._id, amount: { $gt: 0 } },
        [{ $set: { isActive: { $not: '$isActive' } } }],
        { new: true }
      );

      return toggledIsActive;
    },
    checkQueue: async (parent, { medicineId, queueId }, context) => {
      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');
      const medicine = await Medicine.findOne({
        _id: medicineId,
        'queue._id': queueId,
      });
      const index = medicine.queue.findIndex((el) => el._id == queueId);

      if (index > -1) {
        medicine.queue[index].checked = true;
        medicine.amount -= medicine.dosage;
      }

      const toggledQueueChecked = await medicine.save();
      return toggledQueueChecked;
    },
  },
};

module.exports = resolvers;
