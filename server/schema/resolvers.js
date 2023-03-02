const { AuthenticationError } = require('apollo-server-express');
const { User, Medicine } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get single medicine
    medicine: async (parent, { medicineId }, context) => {
      // delete after context implementation
      return Medicine.findOne({ _id: medicineId });

      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');
      return Medicine.findOne({ _id: medicineId, userId: context.user.id });
    },
    // gets all medicine matching userId using context
    medicines: async (parent, args, context) => {
      // delete after context implementation
      return Medicine.find({});

      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');
      return Medicine.find({ userId: context.user.id });
    },
    dailymeds: async (parent, args, context) => {
      // delete after context implementation
      return Medicine.find({ isActive: true });

      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');
      return Medicine.find({ userId: context.user.id, isActive: true });
    },
    // TODO: login user
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
        userId: context.user.id,
      });

      return newMedicine;
    },
    // updates fields of medicine depending on whats passed in
    updateMedicine: async (parent, { medicineId, medicine }, context) => {
      // delete after context implementation
      const tempUpdateMedicine = await Medicine.findOneAndUpdate(
        { _id: medicineId },
        { ...medicine },
        { new: true }
      );

      return tempUpdateMedicine;

      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');

      const updatedMedicine = await Medicine.findOneAndUpdate(
        { _id: medicineId, userId: context.user.id },
        { ...medicine },
        { new: true }
      );

      return updatedMedicine;
    },
    // toggles isActive of specific medicine
    toggleMedicine: async (parent, { medicineId }, context) => {
      // delete after context implementation
      const tempToggledMedicine = await Medicine.findOneAndUpdate(
        { _id: medicineId },
        [{ $set: { isActive: { $not: '$isActive' } } }],
        { new: true }
      );

      return tempToggledMedicine;

      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');

      const toggledMedicine = await Medicine.findOneAndUpdate(
        { _id: medicineId, userId: context.user.id },
        [{ $set: { isActive: { $not: '$isActive' } } }],
        { new: true }
      );

      return toggledMedicine;
    },
  },
};

module.exports = resolvers;
