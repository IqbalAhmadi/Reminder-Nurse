import { QUERY_MEDICINES } from './queries';

export const addMedicineCache = {
  update(cache, { data: { addMedicine } }) {
    try {
      const { medicines } = cache.readQuery({ query: QUERY_MEDICINES });

      cache.writeQuery({
        query: QUERY_MEDICINES,
        data: { medicines: [...medicines, addMedicine] },
      });
    } catch (e) {
      console.error(e);
    }
  },
};

export const updateMedicineCache = {
  update(cache, { data: { updateMedicine } }) {
    try {
      const { medicines } = cache.readQuery({ query: QUERY_MEDICINES });
      const filteredMedicines = medicines.filter(
        (medicine) => medicine._id !== updateMedicine._id
      );

      cache.writeQuery({
        query: QUERY_MEDICINES,
        data: { medicines: [...filteredMedicines, updateMedicine] },
      });
    } catch (e) {
      console.error(e);
    }
  },
};

export const toggleIsActiveCache = {
  update(cache, { data: { toggleIsActive } }) {
    try {
      const { medicines } = cache.readQuery({ query: QUERY_MEDICINES });
      const filteredMedicines = medicines.filter(
        (medicine) => medicine._id !== toggleIsActive._id
      );

      cache.writeQuery({
        query: QUERY_MEDICINES,
        data: { medicines: [...filteredMedicines, toggleIsActive] },
      });
    } catch (e) {
      console.error(e);
    }
  },
};

export const toggledQueueCheckedCache = {
  // TODO finish this part
  update(cache, { data: { toggleQueueChecked } }) {
    try {
      console.log(toggleQueueChecked);
      const { medicines } = cache.readQuery({ query: QUERY_MEDICINES });
      const filteredMedicines = medicines.filter(
        (medicine) => medicine._id !== toggleQueueChecked._id
      );

      cache.writeQuery({
        query: QUERY_MEDICINES,
        data: { medicines: [...filteredMedicines, toggleQueueChecked] },
      });
    } catch (e) {
      console.error(e);
    }
  },
};
