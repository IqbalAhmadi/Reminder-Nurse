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
