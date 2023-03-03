import { gql } from '@apollo/client';

export const QUERY_MEDICINE = gql`
  query singleMedicine($medicineId: ID!) {
    medicine(medicineId: $medicineId) {
      _id
      name
      amount
      interval
      subInterval
      times
      isActive
      userId
    }
  }
`;

export const QUERY_MEDICINES = gql`
  query allMedicines {
    medicines {
      _id
      name
      amount
      interval
      subInterval
      times
      isActive
      userId
    }
  }
`;

export const QUERY_DAILYMEDS = gql`
  query Dailymeds {
    dailymeds {
      _id
      amount
      interval
      name
      subInterval
      times
      userId
    }
  }
`;
