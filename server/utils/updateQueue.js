const { Medicine } = require('../models');
const dayjs = require('dayjs');

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
                if (time == medicine.queue[i]) return false;
              }
              return true;
            })
          );

          updatedMedicines.push(
            await Medicine.findOneAndUpdate(
              { _id: medicine._id },
              {
                queue: [...newQueue],
                queueLastFilled: Date.now(),
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
