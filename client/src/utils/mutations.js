import { gql } from '@apollo/client';

export const ADD_MEDICINE = gql`
  mutation addMedicine($medicine: MedicineInput!) {
    addMedicine(medicine: $medicine) {
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

export const UPDATE_MEDICINE = gql`
  mutation updateMedicine($medicineId: ID!, $medicine: MedicineInput!) {
    updateMedicine(medicineId: $medicineId, medicine: $medicine) {
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

export const TOGGLE_ACTIVE = gql`
  mutation toggleIsActive($medicineId: ID!) {
    toggleIsActive(medicineId: $medicineId) {
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

export const TOGGLE_CHECKED = gql`
  mutation checkQueue($medicineId: ID!, $queueId: ID!) {
    checkQueue(medicineId: $medicineId, queueId: $queueId) {
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
      userId
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
