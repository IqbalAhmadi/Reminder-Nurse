const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
  }
  type Medicine {
    _id: ID!
    name: String
    dosage: Int
    amount: Int
    interval: String
    subInterval: String
    times: [String]
    queue: [Queue]
    isActive: Boolean
    userId: ID!
  }

  type Queue {
    _id: ID!
    time: String!
    checked: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  input MedicineInput {
    name: String
    dosage: Int
    amount: Int
    interval: String
    subInterval: String
    times: [String]
  }

  input QueueInput {
    time: String!
  }

  type Query {
    me: User!
    medicine(medicineId: ID!): Medicine
    medicines: [Medicine]
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addMedicine(medicine: MedicineInput!): Medicine
    updateMedicine(medicineId: ID!, medicine: MedicineInput!): Medicine
    toggleIsActive(medicineId: ID!): Medicine
    checkQueue(medicineId: ID!, queueId: ID!): Medicine
  }
`;
module.exports = typeDefs;
