import { gql } from '@apollo/client';

export const QUERY_MEDICINE = gql`
  query singleMedicine($medicineId: ID!) {
    medicine(medicineId: $medicineId) {
      _id
      name
      start
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
      start
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
      start
      subInterval
      times
      userId
    }
  }
`;
