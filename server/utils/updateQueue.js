const { Medicine } = require('../models');

module.exports = {
  updateQueue: async (userMedicines) => {
    const updatedMedicines = [];

    await Promise.all(
      userMedicines.map(async (medicine) => {
        const fillQueue = await medicine.fillQueue();

        if (fillQueue) {
          const newQueue = medicine.queue.concat(
            medicine.times.filter((time) => {
              for (let i = 0; i < medicine.queue.length; i++) {
                if (time == medicine.queue[i].time) return false;
              }
              return true;
            })
          );

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
