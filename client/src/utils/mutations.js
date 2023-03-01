import { gql } from '@apollo/client';

export const TOGGLE_ACTIVE = gql`
  mutation toggleMedicine($medicineId: ID!) {
    toggleMedicine(medicineId: $medicineId) {
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
