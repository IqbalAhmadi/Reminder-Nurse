const { Medicine } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

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
  },
  Mutation: {
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
      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');

      const updatedMedicine = await Medicine.updateOne(
        { _id: medicineId, userId: context.user.id },
        { ...medicine },
        { new: true }
      );

      return updatedMedicine;
    },
    // toggles isActive of specific medicine
    toggleMedicine: async (parent, { medicineId }, context) => {
      if (!context.user)
        throw new AuthenticationError('You need to be logged in!');

      const toggledMedicine = await Medicine.updateOne(
        { id: medicineId, userId: context.user.id },
        { $set: { isActive: { $not: '$isActive' } } },
        { new: true }
      );

      return toggledMedicine;
    },
  },
};

module.exports = resolvers;
