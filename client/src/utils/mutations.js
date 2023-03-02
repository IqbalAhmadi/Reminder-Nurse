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

export const ADD_MEDICINE = gql`
  mutation addMedicine($medicine: MedicineInput!) {
    addMedicine(medicine: $medicine){
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

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
