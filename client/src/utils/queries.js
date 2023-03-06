import { gql } from '@apollo/client';

export const QUERY_MEDICINE = gql`
  query singleMedicine($medicineId: ID!) {
    medicine(medicineId: $medicineId) {
      _id
      name
      dosage
      amount
      interval
      subInterval
      times
      queue {
        _id
        time
        checked
      }
      isActive
    }
  }
`;

export const QUERY_MEDICINES = gql`
  query allMedicines {
    medicines {
      _id
      name
      dosage
      amount
      interval
      subInterval
      times
      queue {
        _id
        time
        checked
      }
      isActive
    }
  }
`;
