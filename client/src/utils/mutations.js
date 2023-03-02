import { gql } from '@apollo/client';

export const UPDATE_MEDICINE = gql`
  mutation updateMedicine($medicineId: ID!, $medicine: MedicineInput!) {
    updateMedicine(medicineId: $medicineId, medicine: $medicine) {
      _id
      name
      amount
      interval
      subInterval
      times
      isActive
    }
  }
`;

export const TOGGLE_ACTIVE = gql`
  mutation toggleMedicine($medicineId: ID!) {
    toggleMedicine(medicineId: $medicineId) {
      _id
      name
      amount
      interval
      subInterval
      times
      isActive
    }
  }
`;
