const { Medicine } = require('../models');

module.exports = {
  // updates the queue object on all medicine
  updateQueue: async (userMedicines) => {
    // new object to be returned with all medicines
    const updatedMedicines = [];

    await Promise.all(
      userMedicines.map(async (medicine) => {
        // returns true/false if the particular medicine's queue has to be refilled depending on how often they take it
        const fillQueue = await medicine.fillQueue();

        // if a single medicine has to be refilled then run this else just push onto updatedMedicine obj
        if (fillQueue) {
          // concat medicine queue with medicines returned from filter which checks for times not on the queue already
          const newQueue = medicine.queue.concat(
            medicine.times.filter((time) => {
              for (let i = 0; i < medicine.queue.length; i++) {
                if (time == medicine.queue[i].time) return false;
              }
              return true;
            })
          );

          // updates the document on Medicine model then when its returned it gets pushed into the updatedMedicines array
          updatedMedicines.push(
            await Medicine.findOneAndUpdate(
              { _id: medicine._id },
              {
                queue: [...newQueue],
                queueLastFilled: new Date().setHours(0, 0, 0, 0),
              },
              { new: true }
            )
          );
        } else updatedMedicines.push(medicine);
      })
    );

    return updatedMedicines;
  },
};
